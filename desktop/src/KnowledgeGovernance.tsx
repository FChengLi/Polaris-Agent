import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { rpc } from './rpc'

const checkLabels = {
  relevance: '与当前项目或用户长期偏好相关',
  source: '来源可信，能回到原始任务或文件核对',
  applicability: '适用范围清楚，不会跨项目误用',
  sensitive_information: '不含密钥、口令或其他敏感信息',
  prompt_injection: '不含要求 Agent 改变权限或忽略指令的内容',
} as const
type CheckKey = keyof typeof checkLabels
type Checks = Record<CheckKey, boolean>
const statusLabels: Record<string, string> = { candidate:'待审核', ready:'待审核', observing:'积累中', active:'已启用', approved:'已审核', promoted:'已安装', quarantined:'已隔离', superseded:'已替代', archived:'已归档' }
const tabs = ['项目 Wiki','长期记忆','Skill 审核与版本','任务规格']
const emptyChecks = (): Checks => ({ relevance: false, source: false, applicability: false, sensitive_information: false, prompt_injection: false })

// 知识、记忆和 Skill 共用审核门槛：来源、适用范围及风险项都需要确认。
function Review({ item, kind, refresh }: { item: any; kind: 'wiki'|'memory'|'skill'; refresh(): unknown }) {
  const [checks, setChecks] = useState<Checks>(emptyChecks)
  const [reason, setReason] = useState('')
  useEffect(()=>setChecks(emptyChecks()),[item.id,item.revision,item.version,item.content,item.instructions,item.source_ref])
  const safe = !Object.values(item.risk_flags || {}).some(Boolean)
  const approve = useMutation({
    mutationFn: () => rpc.call(kind === 'skill' ? 'skill_candidate.review' : `${kind}.approve`, {
      [kind === 'skill' ? 'candidate_id' : kind === 'wiki' ? 'entry_id' : 'memory_id']: item.id, checks,
    }),
    onSuccess: refresh,
  })
  const quarantine = useMutation({
    mutationFn: () => rpc.call(kind === 'skill' ? 'skill_candidate.quarantine' : `${kind}.quarantine`, {
      [kind === 'skill' ? 'candidate_id' : kind === 'wiki' ? 'entry_id' : 'memory_id']: item.id, reason,
    }),
    onSuccess: refresh,
  })
  return <details className="knowledge-review"><summary><ChevronRight size={15}/><span>{item.title}</span><span className="knowledge-row-meta"><span className={`status ${item.status}`}>{statusLabels[item.status] || item.status}</span><span>v{item.version || item.revision || 1}</span></span></summary>
    <p>{item.summary || item.description}</p>
    <small>来源：{({manual:'人工记录',run:'任务运行',file:'工作区文件'} as Record<string,string>)[item.source_type] || (kind === 'skill' ? '成功任务' : '历史记录')} · {item.source_ref || item.example_run_ids?.join(', ') || '未标注'}<br/>适用范围：{item.applicability || '待审核'}</small>
    {item.source_verified === false && <p className="form-error" role="alert">来源暂时无法核实，请检查对应文件或运行记录；也可以先隔离，再修订来源。</p>}
    <pre>{item.content || item.instructions}</pre>
    {Object.entries(item.risk_flags || {}).filter(([, value]) => value).map(([key]) => <p className="form-error" key={key}>自动检查提示：{key==='sensitive_information'?'可能含有敏感信息':key==='prompt_injection'?'可能含有提示注入':key}</p>)}
    {item.status === 'candidate' || item.status === 'ready' ? <>
      <div className="knowledge-checks">{(Object.keys(checkLabels) as CheckKey[]).map(key => <label key={key}><input type="checkbox" checked={checks[key]} onChange={event => setChecks({ ...checks, [key]: event.target.checked })}/>{checkLabels[key]}</label>)}</div>
      <button className="primary" disabled={!safe || item.source_verified === false || !Object.values(checks).every(Boolean) || approve.isPending || quarantine.isPending} onClick={() => approve.mutate()}>{approve.isPending?'审核中…':kind==='skill'?'确认审核':'确认审核并启用'}</button>
    </> : null}
    {['candidate', 'observing', 'ready', 'active', 'approved', 'promoted'].includes(item.status) && <>
      <div className="knowledge-quarantine"><label>隔离原因<input value={reason} onChange={event => setReason(event.target.value)} placeholder="例如：来源过期，需要重新核实"/></label>
      <button disabled={!reason.trim() || quarantine.isPending || approve.isPending} onClick={() => quarantine.mutate()}>{quarantine.isPending?'隔离中…':'隔离'}</button></div>
    </>}
    {(approve.error || quarantine.error) && <p className="form-error" role="alert">{String(approve.error || quarantine.error)}</p>}
  </details>
}

function QueryState({query}:{query:{isLoading:boolean;error:unknown;refetch():unknown}}){
  if(query.isLoading)return <p className="knowledge-empty" role="status">正在加载…</p>
  if(query.error)return <p className="form-error" role="alert">加载失败，请重试。<button onClick={()=>query.refetch()}>重试</button></p>
  return null
}

function SkillVersions({ skill, refresh }: { skill: any; refresh(): unknown }) {
  const [open, setOpen] = useState(false)
  const history = useQuery({
    queryKey: ['skill-history', skill.scope, skill.name, skill.version],
    queryFn: () => rpc.call<{versions: any[]}>('skill.history', { name: skill.name, scope: skill.scope }).then(value => value.versions),
    enabled: open,
  })
  const restore = useMutation({
    mutationFn: (version: number) => rpc.call('skill.restore', { name: skill.name, scope: skill.scope, version }),
    onSuccess: () => { void history.refetch(); refresh() },
  })
  return <details className="knowledge-review" onToggle={event => setOpen(event.currentTarget.open)}><summary><ChevronRight size={15}/><span>{skill.name}</span><span className="knowledge-row-meta">当前 v{skill.version || 1}</span></summary>
    {history.isLoading && <p role="status">正在加载版本…</p>}{history.error && <p className="form-error" role="alert">版本加载失败。<button onClick={() => history.refetch()}>重试</button></p>}{history.data?.length===0 && <p className="knowledge-empty">还没有历史版本，下一次更新会保存版本记录。</p>}
    {history.data?.map(version => <div key={version.version}><strong>v{version.version}</strong><small>{new Date(version.created_at).toLocaleString()}</small><pre>{version.instructions}</pre><button disabled={restore.isPending || version.version === (skill.version || 1)} onClick={() => restore.mutate(version.version)}>恢复为新版本</button></div>)}
    {restore.error && <p className="form-error" role="alert">{String(restore.error)}</p>}
  </details>
}

function TaskSpecEditor({ task, refresh }: { task: any; refresh(): unknown }) {
  const [goal, setGoal] = useState(task.goal || '')
  const [constraints, setConstraints] = useState((task.constraints || []).join('\n'))
  const [criteria, setCriteria] = useState((task.success_criteria || []).join('\n'))
  const revise = useMutation({
    mutationFn: () => rpc.call('task.spec_revise', {
      task_id: task.id, goal,
      constraints: constraints.split('\n').map((value: string) => value.trim()).filter(Boolean),
      success_criteria: criteria.split('\n').map((value: string) => value.trim()).filter(Boolean),
    }), onSuccess: refresh,
  })
  return <details className="knowledge-review"><summary><ChevronRight size={15}/>{task.title} · 规格 v{task.spec_revision || 1}</summary>
    <small>已绑定运行：{Object.entries(task.spec_bindings || {}).map(([run, version]) => `${run.slice(0, 8)}(v${version})`).join('、') || '无'}</small>
    <small>修订后的约束从下一次运行开始生效；已有运行保持原绑定版本。</small>
    <label>目标<textarea value={goal} onChange={event => setGoal(event.target.value)}/></label>
    <label>约束（每行一条）<textarea value={constraints} onChange={event => setConstraints(event.target.value)}/></label>
    <label>验收条件（每行一条）<textarea value={criteria} onChange={event => setCriteria(event.target.value)}/></label>
    <button className="primary" disabled={!goal.trim() || revise.isPending} onClick={() => revise.mutate()}>保存新规格版本</button>
    {revise.error && <p className="form-error" role="alert">{String(revise.error)}</p>}
  </details>
}

export default function KnowledgeGovernance({ skills, installedSkills, refreshSkills }: { skills: any[]; installedSkills: any[]; refreshSkills(): unknown }) {
  const [tab, setTab] = useState(0)
  const [wikiEditing, setWikiEditing] = useState(false)
  const [memoryEditing, setMemoryEditing] = useState(false)
  const wiki = useQuery({ queryKey: ['wiki'], queryFn: () => rpc.call<{entries: any[]}>('wiki.list', {}).then(value => value.entries) })
  const memory = useQuery({ queryKey: ['memory', 'governance'], queryFn: () => rpc.call<any>('memory.list', {}) })
  const tasks = useQuery({ queryKey: ['tasks', 'specs'], queryFn: () => rpc.call<{tasks: any[]}>('task.list', {limit: 100}).then(value => value.tasks) })
  const [draft, setDraft] = useState({ title: '', summary: '', content: '', source_type: 'manual', source_ref: '', applicability: '', supersedes_id: '' })
  const [memoryDraft, setMemoryDraft] = useState({ id: '', title: '', summary: '', content: '', source_ref: '', applicability: 'user' })
  const propose = useMutation({ mutationFn: () => rpc.call('wiki.propose', draft), onSuccess: () => { setDraft({ title: '', summary: '', content: '', source_type: 'manual', source_ref: '', applicability: '', supersedes_id: '' }); setWikiEditing(false); wiki.refetch() } })
  const proposeMemory = useMutation({
    mutationFn: () => rpc.call(memoryDraft.id ? 'memory.revise' : 'memory.propose', {
      memory_id: memoryDraft.id, title: memoryDraft.title, summary: memoryDraft.summary,
      content: memoryDraft.content, source_ref: memoryDraft.source_ref, applicability: memoryDraft.applicability,
    }),
    onSuccess: () => { setMemoryDraft({ id: '', title: '', summary: '', content: '', source_ref: '', applicability: 'user' }); setMemoryEditing(false); memory.refetch() },
  })
  const promote = useMutation({ mutationFn: (candidate: any) => rpc.call('skill.install', {
    name: candidate.action?.kind === 'update' ? candidate.action.skill_name : candidate.name,
    description: candidate.description, instructions: candidate.instructions,
    scope: 'project', candidate_id: candidate.id,
  }), onSuccess: refreshSkills })
  const refresh = () => { void wiki.refetch(); void memory.refetch(); refreshSkills() }
  return <><h2>知识审核</h2><p className="field-note">候选内容只会在人工核对后进入运行上下文。自动检查只能提示明显风险，来源和事实仍需人工判断。</p>
    <div className="knowledge-tabs" role="tablist" aria-label="知识管理分类">{tabs.map((label,index)=><button key={label} id={`knowledge-tab-${index}`} role="tab" aria-selected={tab===index} aria-controls={`knowledge-panel-${index}`} tabIndex={tab===index?0:-1} onClick={()=>setTab(index)} onKeyDown={event=>{const next=event.key==='ArrowRight'?(index+1)%tabs.length:event.key==='ArrowLeft'?(index+tabs.length-1)%tabs.length:event.key==='Home'?0:event.key==='End'?tabs.length-1:-1;if(next>=0){event.preventDefault();setTab(next);event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()}}}>{label}</button>)}</div>
    <div className="knowledge-panel" role="tabpanel" id="knowledge-panel-0" aria-labelledby="knowledge-tab-0" hidden={tab!==0}>
      <QueryState query={wiki}/><details className="knowledge-compose" open={wikiEditing} onToggle={event=>setWikiEditing(event.currentTarget.open)}><summary>{draft.supersedes_id?'修订 Wiki 条目':'新建 Wiki 条目'}</summary>
      <div className="knowledge-form">
        <label>标题<input placeholder="标题" value={draft.title} onChange={event => setDraft({ ...draft, title: event.target.value })}/></label>
        <label>摘要<input placeholder="摘要" value={draft.summary} onChange={event => setDraft({ ...draft, summary: event.target.value })}/></label>
        <label>项目事实或经验<textarea placeholder="项目事实或经验" value={draft.content} onChange={event => setDraft({ ...draft, content: event.target.value })}/></label>
        <label>来源类型<select value={draft.source_type} onChange={event => setDraft({ ...draft, source_type: event.target.value })}><option value="manual">人工记录</option><option value="file">仓库文件</option><option value="run">任务运行</option></select></label>
        <label>来源路径或 Run ID<input placeholder="来源路径或 Run ID" value={draft.source_ref} onChange={event => setDraft({ ...draft, source_ref: event.target.value })}/></label>
        <label>适用范围，例如 backend API<input placeholder="适用范围，例如 backend API" value={draft.applicability} onChange={event => setDraft({ ...draft, applicability: event.target.value })}/></label>
        {draft.supersedes_id && <small>正在修订 {draft.supersedes_id}</small>}
        <button disabled={!draft.title || !draft.summary || !draft.content || !draft.source_ref || !draft.applicability || propose.isPending} onClick={() => propose.mutate()}>提交候选</button>
        {propose.error && <p className="form-error" role="alert">{String(propose.error)}</p>}
      </div></details>
      {wiki.data?.length===0 && <p className="knowledge-empty">还没有项目知识。新建条目并审核后，Agent 才会使用它。</p>}
      {wiki.data?.map(item => <div key={item.id}><Review item={item} kind="wiki" refresh={refresh}/>{item.status === 'active' || item.status === 'quarantined' ? <button onClick={() => {setWikiEditing(true);propose.reset();setDraft({ title: item.title, summary: item.summary, content: item.content, source_type: item.source_type, source_ref: item.source_ref, applicability: item.applicability, supersedes_id: item.id })}}>修订为新版本</button> : null}</div>)}
    </div><div className="knowledge-panel" role="tabpanel" id="knowledge-panel-1" aria-labelledby="knowledge-tab-1" hidden={tab!==1}>
      <QueryState query={memory}/><details className="knowledge-compose" open={memoryEditing} onToggle={event=>setMemoryEditing(event.currentTarget.open)}><summary>{memoryDraft.id?'修订记忆':'新建记忆'}</summary>
      <div className="knowledge-form">
        {memoryDraft.id && <small>正在修订 {memoryDraft.id}</small>}
        <label>标题<input placeholder="标题" value={memoryDraft.title} onChange={event => setMemoryDraft({ ...memoryDraft, title: event.target.value })}/></label>
        <label>摘要<input placeholder="摘要" value={memoryDraft.summary} onChange={event => setMemoryDraft({ ...memoryDraft, summary: event.target.value })}/></label>
        <label>长期事实或偏好<textarea placeholder="长期事实或偏好" value={memoryDraft.content} onChange={event => setMemoryDraft({ ...memoryDraft, content: event.target.value })}/></label>
        <label>来源，例如用户明确说明<input placeholder="来源，例如用户明确说明" value={memoryDraft.source_ref} onChange={event => setMemoryDraft({ ...memoryDraft, source_ref: event.target.value })}/></label>
        <label>适用范围<input placeholder="适用范围" value={memoryDraft.applicability} onChange={event => setMemoryDraft({ ...memoryDraft, applicability: event.target.value })}/></label>
        <button disabled={!memoryDraft.title || !memoryDraft.summary || !memoryDraft.content || !memoryDraft.source_ref || !memoryDraft.applicability.trim() || proposeMemory.isPending} onClick={() => proposeMemory.mutate()}>提交记忆候选</button>
        {proposeMemory.error && <p className="form-error" role="alert">{String(proposeMemory.error)}</p>}
      </div></details>
      {memory.data && ![...(memory.data.candidates||[]),...(memory.data.active||[]),...(memory.data.quarantined||[])].length && <p className="knowledge-empty">暂无待审核或已启用的记忆。</p>}
      {memory.data?.candidates?.map((item: any) => <Review item={item} kind="memory" refresh={refresh} key={item.id}/>)}
      {[...(memory.data?.active || []), ...(memory.data?.quarantined || [])].map((item: any) => <div key={item.id}><Review item={item} kind="memory" refresh={refresh}/><button onClick={() => {setMemoryEditing(true);proposeMemory.reset();setMemoryDraft({ id: item.id, title: item.title, summary: item.summary, content: item.content, source_ref: 'user_revision', applicability: item.applicability || 'user' })}}>修订为新版本</button></div>)}
      </div><div className="knowledge-panel" role="tabpanel" id="knowledge-panel-2" aria-labelledby="knowledge-tab-2" hidden={tab!==2}><h3>Skill 候选</h3>
      {skills.length===0 && <p className="knowledge-empty">还没有自动学习出的 Skill 候选。</p>}
      {skills.map((item: any) => <div key={item.id}><Review item={item} kind="skill" refresh={refresh}/>{item.status === 'approved' && <button disabled={promote.isPending} onClick={() => promote.mutate(item)}>{item.action?.kind === 'update' ? `替代 ${item.action.skill_name}` : '安装已审核 Skill'}</button>}</div>)}
      {promote.error && <p className="form-error" role="alert">{String(promote.error)}</p>}
      <h3>Skill 版本</h3>{installedSkills.length===0 && <p className="knowledge-empty">安装 Skill 后，可以在这里查看和恢复历史版本。</p>}{installedSkills.map((skill: any) => <SkillVersions key={`${skill.scope}:${skill.name}`} skill={skill} refresh={refreshSkills}/>)}
    </div><div className="knowledge-panel" role="tabpanel" id="knowledge-panel-3" aria-labelledby="knowledge-tab-3" hidden={tab!==3}>
    <p className="field-note">在这里修订目标、约束和验收条件，Agent 只能更新任务进度。</p><QueryState query={tasks}/>{tasks.data && !tasks.data.some(task=>['active','blocked','pending'].includes(task.status)) && <p className="knowledge-empty">暂无进行中的任务，创建任务后可以在这里管理规格。</p>}{tasks.data?.filter(task => ['active', 'blocked', 'pending'].includes(task.status)).map(task => <TaskSpecEditor key={`${task.id}:${task.spec_revision}`} task={task} refresh={() => tasks.refetch()}/>)}
    </div>
  </>
}
