function getInnerTextWithCssContent(a){let b,c;a=a instanceof Text?a.parentElement:a;return a instanceof Element?(b=window.getComputedStyle(a,':before')['content'],b=b==='none'?'':b.slice(1,-1),c=window.getComputedStyle(a,':after')['content'],c=c==='none'?'':c.slice(1,-1),`${b}${a.innerText}${c}`):(String(a)||'');}
