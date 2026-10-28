# 更新记录 / Changelog

## 2026-10-28 — 合入 KoreAgent1027 / Integrate KoreAgent1027

### 新增与改进

- 项目 Wiki：来源记录、关键词检索、人工审核、版本修订与隔离。
- 长期与核心记忆先作为候选保存，审核后才用于后续任务；旧未审核内容迁移为候选。
- Skill 候选增加人工审核，安装保留版本，可将历史内容恢复为新版本。
- Task Spec 按版本保存目标、约束、验收条件，每次运行绑定对应规格。
- 设置页新增知识审核分类及快捷入口，适配 Polaris 的浅色、深色与窄窗口布局。
- 第一条用户消息自动命名会话；过滤任务结束后的反思和迟到流式事件，避免回复状态重新出现。
- 修复 Windows PowerShell 首次检查缺失依赖时可能中止启动的问题。
- 补齐 Agent 记忆列表的审核边界，防止读取候选、隔离或归档记忆。
- 修复 Skill 删除后重装的版本编号冲突，恢复旧版本时保留候选关联，使隔离继续有效。
- 新增审核、迁移及版本恢复回归测试，补充中文源码说明。

保留既有 Polaris 名称、北极星 Logo、本地字体、配色、桌面启动器、窗口标题栏和双语说明。核心仍为自定义 Python Agent 运行时。

### Added and improved

- Project Wiki with source references, keyword search, human review, revisions, and quarantine.
- Long-term and core memories remain candidates until reviewed; legacy unreviewed entries are preserved as candidates.
- Explicit review for learned Skill candidates, retained installation versions, and restoration as a new version.
- Versioned task goals, constraints, and acceptance criteria, with specification binding per run.
- Categorized Knowledge Review in Settings, with a shortcut and Polaris light, dark, and narrow layouts.
- Automatic conversation titles from the first user message; post-run and late streaming events no longer restart completed replies.
- Fixed missing-dependency detection during first launch in Windows PowerShell.
- Restricted model-facing memory listing to reviewed active entries.
- Fixed version conflicts when reinstalling deleted Skills and retained candidate provenance when restoring versions.
- Added regression coverage for review boundaries, migration, and version recovery, plus Chinese source comments.

Existing Polaris branding, North Star assets, bundled fonts, palette, desktop launcher, Windows title bar, and bilingual documentation are retained. The core remains a custom Python Agent runtime.
