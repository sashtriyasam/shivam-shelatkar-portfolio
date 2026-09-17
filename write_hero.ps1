\ = New-Object System.Text.StringBuilder
\.AppendLine('export function HeroFallback() {') | Out-Null
\.AppendLine('  return (') | Out-Null
\.AppendLine('    <section aria-labelledby=" hero-fallback-heading\ className=\hero__fallback\>') | Out-Null
\.AppendLine(' <h1 id=\hero-fallback-heading\ className=\sr-only\>Shivam Shelatkar</h1>') | Out-Null
\.AppendLine(' <div className=\hero__fallback-content\>') | Out-Null
\.AppendLine(' <p>Founder @Swarvibhaa · tabla · piano · Unity</p>') | Out-Null
\.AppendLine(' <div className=\hero__fallback-ctas\>') | Out-Null
\.AppendLine(' <a href=\https://swarvibhaa.odoo.com/blog/swarvibhaa-originals-4/raatrani-10\ target=\_blank\ rel=\noopener noreferrer\ className=\btn btn-primary\>Listen to Raatrani</a>') | Out-Null
\.AppendLine(' <a href=\/work\ className=\btn btn-outline\>See work</a>') | Out-Null
\.AppendLine(' </div>') | Out-Null
\.AppendLine(' </div>') | Out-Null
\.AppendLine(' </section>') | Out-Null
\.AppendLine(' );') | Out-Null
\.AppendLine('}') | Out-Null
\ = \.ToString()
[IO.File]::WriteAllText('D:\TESTWEB\components\hero\HeroFallback.tsx', \)
