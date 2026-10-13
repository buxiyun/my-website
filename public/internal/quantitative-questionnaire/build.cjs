const fs=require('fs'),path=require('path');
const root=__dirname;
const html=fs.readFileSync(path.join(root,'template.html'),'utf8').replace('<!-- BANK -->',()=>'<script>\n'+fs.readFileSync(path.join(root,'bank.js'),'utf8').replace(/<\/script/gi,'<\\/script')+'\n</script>').replace('<!-- APP -->',()=>'<script>\n'+fs.readFileSync(path.join(root,'app.js'),'utf8').replace(/<\/script/gi,'<\\/script')+'\n</script>');
fs.writeFileSync(path.join(root,'index.html'),html);console.log('Built self-contained index.html',Buffer.byteLength(html),'bytes');
