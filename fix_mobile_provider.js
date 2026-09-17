const fs = require('fs');
const content = ' use client;\n\n' +
'import { createContext, useContext, useState, ReactNode, useRef } from react;\n\n' +
'interface MobileMenuContextValue {\n' +
'  open: boolean;\n' +
'  openMenu: () => void;\n' +
'  close: () => void;\n' +
'  toggle: () => void;\n' +
'  triggerRef: React.RefObject<HTMLButtonElement>;\n' +
'}\n\n' +
'const MobileMenuContext = createContext<MobileMenuContextValue | null>(null);\n\n' +
'export function useMobileMenu() {\n' +
'  const ctx = useContext(MobileMenuContext);\n' +
'  if (!ctx) throw new Error(useMobileMenu must be inside MobileMenuProvider);\n' +
'  return ctx;\n' +
'}\n\n' +
'export function MobileMenuProvider({ children }: { children: ReactNode }) {\n' +
'  const [open, setOpen] = useState(false);\n' +
'  const triggerRef = useRef<HTMLButtonElement>(null);\n\n' +
'  return (\n' +
'    <MobileMenuContext.Provider\n' +
'      value={\n' +
'        open,\n' +
'        openMenu: () => setOpen(true),\n' +
'        close: () => setOpen(false),\n' +
'        toggle: () => setOpen((v) => !v),\n' +
'        triggerRef,\n' +
'      }\n' +
'    >\n' +
'      {children}\n' +
'    </MobileMenuContext.Provider>\n' +
'  );\n' +
'}';
fs.writeFileSync(D:/TESTWEB/components/layout/MobileMenuProvider.tsx, content);
console.log(MobileMenuProvider.tsx done);
