/// <reference types="vite/client" />
declare global { interface Window { koreNext?: { platform?: string; openExternal(url: string): Promise<void>; notify(title: string, body: string): Promise<void>; showApproval():Promise<void>; hideApproval():Promise<void> } } }
export {}

