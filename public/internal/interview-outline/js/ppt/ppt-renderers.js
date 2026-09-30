// =========================================================
// PPT 渲染器 — PptxGenJS 幻灯片绘制引擎
// =========================================================

/* --- PPT 生成 --- */
function generatePPT(){
  if(!pptSlides.length) return alert('请先添加幻灯片');
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptSlides.forEach((slide,i)=>{
    const fn = PPT_RENDERERS[slide.layoutId];
    const layout = PPT_LAYOUTS.find(l=>l.id===slide.layoutId);
    const ctx = {title:slide.title, content:slide.content||{}, idx:i, total:pptSlides.length, layout};
    if(fn) fn(pptx, slide.title, ctx);
    else renderDefaultSlide(pptx, slide.title, ctx);
  });
  pptx.writeFile({fileName:'研究报告_PPT.pptx'});
}

/* --- PPT 渲染器 --- */
const PPT_RENDERERS = {};
const C = PPT_COLORS;

function addHeader(slide, pptx, title, hypo){
  slide.addShape(pptx.ShapeType.rect, {x:0,y:0,w:13.333,h:0.04,fill:{color:C.brand}});
  slide.addText(title, {x:0.8,y:0.3,w:10,h:0.6,fontSize:20,bold:true,color:C.primary,fontFace:'Microsoft YaHei'});
  slide.addShape(pptx.ShapeType.rect, {x:0.8,y:0.95,w:1.5,h:0.03,fill:{color:C.brand}});
  if(hypo){
    slide.addText(hypo, {x:0.8,y:1.1,w:11,h:0.5,fontSize:11,italic:true,color:C.ink2,fontFace:'Microsoft YaHei',valign:'top'});
    slide.addText('CONFIDENTIAL', {x:10.5,y:1.35,w:2.5,h:0.3,fontSize:8,color:C.ink3,align:'right'});
  } else {
    slide.addText('CONFIDENTIAL', {x:10.5,y:0.35,w:2.5,h:0.3,fontSize:8,color:C.ink3,align:'right'});
  }
}

PPT_RENDERERS['cover-dark'] = function(pptx, title, ctx){
  const s = pptx.addSlide();
  s.background = {color:C.primary};
  s.addShape(pptx.ShapeType.rect, {x:0,y:0,w:13.333,h:7.5,fill:{color:C.primary}});
  s.addShape(pptx.ShapeType.rect, {x:5.5,y:2.8,w:2.333,h:0.04,fill:{color:C.brand}});
  s.addText(title, {x:1.5,y:3.1,w:10.333,h:1.2,fontSize:36,bold:true,color:C.white,align:'center',fontFace:'Microsoft YaHei'});
  const c = ctx.content;
  s.addText(c.subtitle||'', {x:1.5,y:4.3,w:10.333,h:0.5,fontSize:16,color:C.ink3,align:'center',fontFace:'Microsoft YaHei'});
  s.addText([c.author||'',c.date?' · '+c.date:''].join(''), {x:1.5,y:5.2,w:10.333,h:0.4,fontSize:12,color:'AAAAAA',align:'center',fontFace:'Microsoft YaHei'});
  s.addShape(pptx.ShapeType.rect, {x:0,y:7.3,w:13.333,h:0.2,fill:{color:C.brand}});
};

PPT_RENDERERS['cover-light'] = function(pptx, title, ctx){
  const s = pptx.addSlide();
  s.background = {color:C.white};
  s.addShape(pptx.ShapeType.rect, {x:0.8,y:1.5,w:0.06,h:2.5,fill:{color:C.brand}});
  s.addText(title, {x:1.2,y:1.8,w:9,h:1,fontSize:34,bold:true,color:C.primary,fontFace:'Microsoft YaHei'});
  const c = ctx.content;
  s.addText(c.subtitle||'', {x:1.2,y:2.9,w:9,h:0.5,fontSize:16,color:C.ink2,fontFace:'Microsoft YaHei'});
  s.addText([c.author||'',c.date?' · '+c.date:''].join(''), {x:1.2,y:3.6,w:9,h:0.4,fontSize:12,color:C.ink3,fontFace:'Microsoft YaHei'});
  s.addShape(pptx.ShapeType.rect, {x:0,y:7.3,w:13.333,h:0.06,fill:{color:C.brand}});
};

PPT_RENDERERS['toc-grid'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const items = ctx.content.items || [];
  const cols = 2;
  items.forEach((item,i)=>{
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 1.0 + col * 5.5;
    const y = 1.5 + row * 0.9;
    s.addShape(pptx.ShapeType.roundRect, {x:x,y:y,w:0.5,h:0.5,rectRadius:0.06,fill:{color:C.light}});
    s.addText(String(i+1).padStart(2,'0'), {x:x,y:y,w:0.5,h:0.5,fontSize:14,bold:true,color:C.brand,align:'center',fontFace:'Microsoft YaHei'});
    s.addText(typeof item==='string'?item:item, {x:x+0.7,y:y+0.05,w:4.2,h:0.4,fontSize:14,color:C.ink,fontFace:'Microsoft YaHei'});
  });
};

PPT_RENDERERS['divider-num'] = function(pptx, title, ctx){
  const s = pptx.addSlide();
  s.background = {color:C.primary};
  const num = String(ctx.idx+1).padStart(2,'0');
  s.addShape(pptx.ShapeType.rect, {x:0,y:0,w:13.333,h:7.5,fill:{color:C.primary}});
  s.addText(num, {x:1,y:1.5,w:3,h:4,fontSize:96,bold:true,color:'1A3A8A',fontFace:'Microsoft YaHei'});
  s.addText(title, {x:4.5,y:2.8,w:7,h:1,fontSize:32,bold:true,color:C.white,fontFace:'Microsoft YaHei'});
  s.addText(ctx.content.subtitle||'', {x:4.5,y:3.9,w:7,h:0.5,fontSize:14,color:C.ink3,fontFace:'Microsoft YaHei'});
  s.addShape(pptx.ShapeType.rect, {x:4.5,y:3.7,w:2,h:0.04,fill:{color:C.brand}});
};

PPT_RENDERERS['quote-page'] = function(pptx, title, ctx){
  const s = pptx.addSlide();
  s.background = {color:C.primary};
  s.addText('"', {x:2,y:1,w:1,h:1.5,fontSize:72,color:'1A3A8A',fontFace:'Georgia'});
  s.addText(ctx.content.quote||title, {x:2,y:2.5,w:9.333,h:2,fontSize:24,color:C.white,italic:true,fontFace:'Microsoft YaHei'});
  if(ctx.content.source) s.addText('— '+ctx.content.source, {x:2,y:4.8,w:9.333,h:0.4,fontSize:12,color:C.ink3,fontFace:'Microsoft YaHei'});
};

PPT_RENDERERS['summary-bullets'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const points = ctx.content.points || [];
  points.forEach((p,i)=>{
    if(!p) return;
    const y = 1.5 + i*0.85;
    s.addShape(pptx.ShapeType.ellipse, {x:1.0,y:y+0.12,w:0.18,h:0.18,fill:{color:C.brand}});
    s.addText(p, {x:1.4,y:y,w:10.5,h:0.6,fontSize:15,color:C.ink,fontFace:'Microsoft YaHei'});
  });
};

PPT_RENDERERS['summary-cards'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.bg};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const cards = ctx.content.cards || {};
  const items = (PPT_LAYOUTS.find(l=>l.id==='summary-cards')?.fields?.[0]?.items || []);
  items.forEach((ci,i)=>{
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.8 + col * 4;
    const y = 1.5 + row * 2.5;
    s.addShape(pptx.ShapeType.roundRect, {x:x,y:y,w:3.6,h:2.1,rectRadius:0.12,fill:{color:C.white},shadow:{type:'outer',blur:6,offset:2,color:'000000',opacity:0.08}});
    s.addText(cards[ci.k+'_v']||'', {x:x+0.2,y:y+0.3,w:3.2,h:0.8,fontSize:16,bold:true,color:C.brand,fontFace:'Microsoft YaHei'});
    s.addText(cards[ci.k+'_n']||ci.l, {x:x+0.2,y:y+1.2,w:3.2,h:0.5,fontSize:12,color:C.ink2,fontFace:'Microsoft YaHei'});
  });
};

PPT_RENDERERS['persona'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const c = ctx.content;
  // Left panel
  s.addShape(pptx.ShapeType.roundRect, {x:0.8,y:1.4,w:3.5,h:5.2,rectRadius:0.12,fill:{color:C.light}});
  s.addText(c.name||'用户画像', {x:0.8,y:1.6,w:3.5,h:0.5,fontSize:18,bold:true,color:C.primary,align:'center',fontFace:'Microsoft YaHei'});
  // Profile KV
  const profile = c.profile || {};
  const keys = ['年龄','家庭','职业','收入'];
  keys.forEach((k,i)=>{
    s.addText(k, {x:1.1,y:2.4+i*0.7,w:1.2,h:0.3,fontSize:10,color:C.ink3,fontFace:'Microsoft YaHei'});
    s.addText(profile[k]||'—', {x:1.1,y:2.7+i*0.7,w:2.8,h:0.3,fontSize:12,color:C.ink,fontFace:'Microsoft YaHei'});
  });
  // Right content
  const rx = 4.8;
  const sections = [{l:'用车需求',v:c.needs},{l:'核心痛点',v:c.painPoints},{l:'购车动机',v:c.motivation}];
  sections.forEach((sec,i)=>{
    const y = 1.5 + i * 1.8;
    s.addText(sec.l, {x:rx,y:y,w:7.5,h:0.35,fontSize:13,bold:true,color:C.brand,fontFace:'Microsoft YaHei'});
    s.addShape(pptx.ShapeType.rect, {x:rx,y:y+0.38,w:1.2,h:0.025,fill:{color:C.brand}});
    s.addText(sec.v||'待补充', {x:rx,y:y+0.5,w:7.5,h:1.1,fontSize:12,color:C.ink,fontFace:'Microsoft YaHei'});
  });
};

PPT_RENDERERS['product-proscons'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const c = ctx.content;
  const cols = [{l:'用户好评',data:c.pros,color:C.green,bg:'E6F7EF'},{l:'用户槽点',data:c.cons,color:'DC2626',bg:'FEF2F2'},{l:'改进建议',data:c.suggestions,color:C.brand,bg:C.light}];
  cols.forEach((col,ci)=>{
    const x = 0.8 + ci * 4;
    s.addShape(pptx.ShapeType.roundRect, {x:x,y:1.4,w:3.6,h:0.5,rectRadius:0.06,fill:{color:col.bg}});
    s.addText(col.l, {x:x,y:1.4,w:3.6,h:0.5,fontSize:13,bold:true,color:col.color,align:'center',fontFace:'Microsoft YaHei'});
    const items = col.data || [];
    items.forEach((item,j)=>{
      if(!item) return;
      s.addText('· '+item, {x:x+0.2,y:2.1+j*0.7,w:3.2,h:0.55,fontSize:12,color:C.ink,fontFace:'Microsoft YaHei'});
    });
  });
};

PPT_RENDERERS['data-big'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.bg};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const cards = ctx.content.cards || {};
  const items = PPT_LAYOUTS.find(l=>l.id==='data-big')?.fields?.[0]?.items || [];
  items.forEach((ci,i)=>{
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.8 + col * 6;
    const y = 1.5 + row * 2.8;
    s.addShape(pptx.ShapeType.roundRect, {x:x,y:y,w:5.5,h:2.4,rectRadius:0.12,fill:{color:C.white},shadow:{type:'outer',blur:6,offset:2,color:'000000',opacity:0.08}});
    s.addText(cards[ci.k+'_v']||'—', {x:x+0.3,y:y+0.3,w:4.9,h:1.2,fontSize:36,bold:true,color:C.brand,fontFace:'Microsoft YaHei'});
    s.addText(cards[ci.k+'_n']||ci.l, {x:x+0.3,y:y+1.5,w:4.9,h:0.5,fontSize:14,color:C.ink2,fontFace:'Microsoft YaHei'});
  });
  if(ctx.content.source) s.addText('来源: '+ctx.content.source, {x:0.8,y:7,w:11,h:0.3,fontSize:9,color:C.ink3,fontFace:'Microsoft YaHei'});
};

PPT_RENDERERS['compare-lr'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const c = ctx.content;
  [{t:c.leftTitle||'方案 A',pts:c.leftPoints||[],color:C.brand,bg:C.light},{t:c.rightTitle||'方案 B',pts:c.rightPoints||[],color:C.orange,bg:'FFF3E6'}].forEach((col,ci)=>{
    const x = 0.8 + ci * 6;
    s.addShape(pptx.ShapeType.roundRect, {x:x,y:1.4,w:5.5,h:0.5,rectRadius:0.06,fill:{color:col.bg}});
    s.addText(col.t, {x:x,y:1.4,w:5.5,h:0.5,fontSize:14,bold:true,color:col.color,align:'center',fontFace:'Microsoft YaHei'});
    col.pts.forEach((p,j)=>{
      if(!p) return;
      s.addText('· '+p, {x:x+0.3,y:2.1+j*0.7,w:4.9,h:0.55,fontSize:13,color:C.ink,fontFace:'Microsoft YaHei'});
    });
  });
};

PPT_RENDERERS['list-icon'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const items = ctx.content.items || [];
  items.forEach((item,i)=>{
    if(!item) return;
    const y = 1.5 + i * 0.85;
    s.addShape(pptx.ShapeType.roundRect, {x:1.0,y:y,w:0.45,h:0.45,rectRadius:0.06,fill:{color:C.brand}});
    s.addText(String(i+1), {x:1.0,y:y,w:0.45,h:0.45,fontSize:14,bold:true,color:C.white,align:'center',fontFace:'Microsoft YaHei'});
    s.addText(item, {x:1.7,y:y,w:10,h:0.45,fontSize:14,color:C.ink,fontFace:'Microsoft YaHei'});
  });
};

PPT_RENDERERS['journey-timeline'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const stages = ctx.content.stages || {};
  const stageNames = ['认知','考虑','体验','决策','购后'];
  // Timeline line
  s.addShape(pptx.ShapeType.rect, {x:1.0,y:3.2,w:11.333,h:0.03,fill:{color:C.light}});
  stageNames.forEach((st,i)=>{
    const x = 1.0 + i * 2.4;
    // Dot
    s.addShape(pptx.ShapeType.ellipse, {x:x+0.8,y:3.05,w:0.3,h:0.3,fill:{color:C.brand}});
    s.addText(st, {x:x,y:2.5,w:1.9,h:0.4,fontSize:13,bold:true,color:C.primary,align:'center',fontFace:'Microsoft YaHei'});
    const sv = stages[st] || {};
    // Below: touches, blockers, drivers
    const info = [];
    if(sv.touches) info.push('触点: '+sv.touches);
    if(sv.blockers) info.push('障碍: '+sv.blockers);
    if(sv.drivers) info.push('驱动: '+sv.drivers);
    s.addText(info.join('\n') || '待补充', {x:x,y:3.6,w:2.2,h:2.5,fontSize:10,color:C.ink2,fontFace:'Microsoft YaHei'});
  });
};

PPT_RENDERERS['competitor-matrix'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const dims = (ctx.content.dimensions||'').split('\n').filter(d=>d.trim());
  const c = ctx.content;
  // Table
  const headerOpts = {bold:true,fill:{color:C.primary},color:C.white};
  const rows = [['维度','品牌A','品牌B','品牌C'].map(t=>({text:t,options:headerOpts}))];
  dims.forEach(d=>rows.push([d,'—','—','—']));
  s.addTable(rows, {x:0.8,y:1.5,w:11.733,colW:[3,2.9,2.9,2.9],fontSize:12,border:{pt:0.5,color:'E0E0E0'},fontFace:'Microsoft YaHei'});
  if(c.insight) s.addText('竞争洞察: '+c.insight, {x:0.8,y:5.5,w:11.733,h:1,fontSize:12,color:C.ink2,fontFace:'Microsoft YaHei'});
};

PPT_RENDERERS['country-compare'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const c = ctx.content;
  const countries = (c.countries||'').split('\n').filter(x=>x.trim());
  const dataLines = (c.data||'').split('\n').filter(x=>x.trim());
  const dim = c.dimension || '市场特征';
  
  if(countries.length === 0) return;
  
  const colW = 11.733 / countries.length;
  const colors = [C.primary, C.brand, C.green, C.orange, '6D2E46', '028090'];
  
  countries.forEach((country, i) => {
    const x = 0.8 + i * colW;
    const color = colors[i % colors.length];
    
    // Country header
    s.addShape(pptx.ShapeType.roundRect, {x:x,y:1.5,w:colW-0.1,h:0.6,rectRadius:0.08,fill:{color:color}});
    s.addText(country.trim(), {x:x,y:1.5,w:colW-0.1,h:0.6,fontSize:14,bold:true,color:C.white,align:'center',fontFace:'Microsoft YaHei'});
    
    // Country data
    const countryData = dataLines.filter(l => l.startsWith(country.trim())).map(l => l.split('|')[1]?.trim() || '');
    const bulletText = countryData.length > 0 
      ? countryData.map(d => '• ' + d).join('\n')
      : '• 待补充';
    
    s.addText(bulletText, {x:x+0.1,y:2.2,w:colW-0.2,h:3.5,fontSize:11,color:C.ink,fontFace:'Microsoft YaHei',lineSpacingMultiple:1.4});
  });
  
  // Cross-country insight
  if(c.insight) {
    s.addShape(pptx.ShapeType.roundRect, {x:0.8,y:5.8,w:11.733,h:1.2,rectRadius:0.1,fill:{color:C.bg}});
    s.addShape(pptx.ShapeType.rect, {x:0.8,y:5.8,w:0.06,h:1.2,fill:{color:C.brand}});
    s.addText('跨国洞察', {x:1.2,y:5.9,w:2,h:0.3,fontSize:12,bold:true,color:C.brand,fontFace:'Microsoft YaHei'});
    s.addText(c.insight, {x:1.2,y:6.2,w:11,h:0.7,fontSize:11,color:C.ink,fontFace:'Microsoft YaHei'});
  }
};

PPT_RENDERERS['scenario-usage'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const c = ctx.content;
  const sceneLines = (c.scenes||'').split('\n').filter(l=>l.trim());
  const colors = [C.primary, C.brand, C.green, C.orange, '6D2E46', '028090'];
  const scenes = sceneLines.map((l,i) => {
    const parts = l.split('|').map(p=>p.trim());
    return {name:parts[0]||'', desc:parts[1]||'', features:parts[2]||'', color:colors[i%colors.length]};
  });
  if(scenes.length === 0) return;
  // 2-column grid layout
  scenes.forEach((sc, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.8 + col * 6;
    const y = 1.5 + row * 2.0;
    // Card background
    s.addShape(pptx.ShapeType.roundRect, {x:x,y:y,w:5.5,h:1.7,rectRadius:0.1,fill:{color:C.bg}});
    // Color accent bar at top
    s.addShape(pptx.ShapeType.rect, {x:x,y:y,w:5.5,h:0.04,fill:{color:sc.color}});
    // Scene name
    s.addText(sc.name, {x:x+0.2,y:y+0.15,w:3,h:0.35,fontSize:13,bold:true,color:sc.color,fontFace:'Microsoft YaHei'});
    // Description
    s.addText(sc.desc, {x:x+0.2,y:y+0.55,w:5,h:0.3,fontSize:11,color:C.ink2,fontFace:'Microsoft YaHei'});
    // Key features
    if(sc.features) {
      s.addText(sc.features.split(/[,，、]/).map(f=>'• '+f.trim()).join('\n'), {x:x+0.2,y:y+0.9,w:5,h:0.7,fontSize:10,color:C.ink,fontFace:'Microsoft YaHei',lineSpacingMultiple:1.3});
    }
  });
  // Insight footer
  if(c.insight) {
    const iy = 1.5 + Math.ceil(scenes.length/2) * 2.0 + 0.2;
    s.addShape(pptx.ShapeType.roundRect, {x:0.8,y:iy,w:11.733,h:1.0,rectRadius:0.1,fill:{color:C.bg}});
    s.addShape(pptx.ShapeType.rect, {x:0.8,y:iy,w:0.06,h:1.0,fill:{color:C.brand}});
    s.addText('场景洞察', {x:1.2,y:iy+0.05,w:2,h:0.3,fontSize:12,bold:true,color:C.brand,fontFace:'Microsoft YaHei'});
    s.addText(c.insight, {x:1.2,y:iy+0.35,w:11,h:0.55,fontSize:11,color:C.ink,fontFace:'Microsoft YaHei'});
  }
};

PPT_RENDERERS['category-needs'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const c = ctx.content;
  // Category name header
  if(c.category) {
    s.addShape(pptx.ShapeType.roundRect, {x:0.8,y:1.4,w:3.5,h:0.45,rectRadius:0.06,fill:{color:C.light}});
    s.addText(c.category, {x:0.8,y:1.4,w:3.5,h:0.45,fontSize:13,bold:true,color:C.primary,align:'center',fontFace:'Microsoft YaHei'});
  }
  // Need level bars
  const needLines = (c.needs||'').split('\n').filter(l=>l.trim());
  const barColors = [C.primary, C.brand, C.green, C.orange, '6D2E46', '028090'];
  const startY = c.category ? 2.1 : 1.5;
  needLines.forEach((l, i) => {
    const parts = l.split('|').map(p=>p.trim());
    const needName = parts[0] || '';
    const importance = parseInt(parts[1]) || 5;
    const desc = parts[2] || '';
    const y = startY + i * 1.1;
    const barW = (importance / 10) * 7;
    const color = barColors[i % barColors.length];
    // Label
    s.addText(needName, {x:0.8,y:y,w:2.5,h:0.3,fontSize:12,bold:true,color:C.ink,fontFace:'Microsoft YaHei'});
    // Bar background
    s.addShape(pptx.ShapeType.roundRect, {x:3.5,y:y+0.05,w:7,h:0.35,rectRadius:0.06,fill:{color:'E8EFFF'}});
    // Bar fill
    s.addShape(pptx.ShapeType.roundRect, {x:3.5,y:y+0.05,w:barW,h:0.35,rectRadius:0.06,fill:{color:color}});
    // Importance number
    s.addText(String(importance), {x:3.5+barW+0.15,y:y,w:0.5,h:0.35,fontSize:11,bold:true,color:color,fontFace:'Microsoft YaHei'});
    // Description
    if(desc) s.addText(desc, {x:3.5,y:y+0.45,w:7.5,h:0.3,fontSize:10,color:C.ink2,fontFace:'Microsoft YaHei'});
  });
  // Priority ranking
  const priorityY = startY + needLines.length * 1.1 + 0.3;
  if(c.priority && priorityY < 6.0) {
    s.addShape(pptx.ShapeType.roundRect, {x:0.8,y:priorityY,w:11.733,h:1.2,rectRadius:0.1,fill:{color:C.bg}});
    s.addShape(pptx.ShapeType.rect, {x:0.8,y:priorityY,w:0.06,h:1.2,fill:{color:C.green}});
    s.addText('优先级排序', {x:1.2,y:priorityY+0.05,w:2.5,h:0.3,fontSize:12,bold:true,color:C.green,fontFace:'Microsoft YaHei'});
    s.addText(c.priority, {x:1.2,y:priorityY+0.35,w:11,h:0.75,fontSize:11,color:C.ink,fontFace:'Microsoft YaHei',lineSpacingMultiple:1.3});
  }
  // Insight
  if(c.insight) {
    s.addShape(pptx.ShapeType.roundRect, {x:0.8,y:6.5,w:11.733,h:0.9,rectRadius:0.1,fill:{color:C.bg}});
    s.addShape(pptx.ShapeType.rect, {x:0.8,y:6.5,w:0.06,h:0.9,fill:{color:C.brand}});
    s.addText('需求洞察', {x:1.2,y:6.55,w:2,h:0.3,fontSize:12,bold:true,color:C.brand,fontFace:'Microsoft YaHei'});
    s.addText(c.insight, {x:1.2,y:6.85,w:11,h:0.45,fontSize:11,color:C.ink,fontFace:'Microsoft YaHei'});
  }
};

PPT_RENDERERS['strategy-4p'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.bg};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const c = ctx.content;
  const quads = [{l:'Product 产品',v:c.product_s,x:0.8,y:1.5},{l:'Price 价格',v:c.price_s,x:6.8,y:1.5},{l:'Place 渠道',v:c.channel_s,x:0.8,y:4.2},{l:'Promotion 传播',v:c.comm_s,x:6.8,y:4.2}];
  quads.forEach(q=>{
    s.addShape(pptx.ShapeType.roundRect, {x:q.x,y:q.y,w:5.5,h:2.3,rectRadius:0.12,fill:{color:C.white},shadow:{type:'outer',blur:4,offset:1,color:'000000',opacity:0.06}});
    s.addShape(pptx.ShapeType.rect, {x:q.x,y:q.y,w:0.06,h:2.3,fill:{color:C.brand}});
    s.addText(q.l, {x:q.x+0.3,y:q.y+0.15,w:4.8,h:0.4,fontSize:14,bold:true,color:C.primary,fontFace:'Microsoft YaHei'});
    s.addText(q.v||'待补充', {x:q.x+0.3,y:q.y+0.65,w:4.8,h:1.4,fontSize:12,color:C.ink,fontFace:'Microsoft YaHei'});
  });
};

PPT_RENDERERS['config-table'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const c = ctx.content;
  const lines = (c.items||'').split('\n').filter(l=>l.trim());
  const headerOpts = {bold:true,fill:{color:C.primary},color:C.white};
  const rows = [['排名','配置项','关注度'].map(t=>({text:t,options:headerOpts}))];
  lines.forEach((l,i)=>{
    const parts = l.split('|').map(p=>p.trim());
    rows.push([String(i+1), parts[0]||'', parts[1]||'']);
  });
  s.addTable(rows, {x:0.8,y:1.5,w:11.733,colW:[1.5,5,5.233],fontSize:12,border:{pt:0.5,color:'E0E0E0'},fontFace:'Microsoft YaHei'});
  if(c.note) s.addText(c.note, {x:0.8,y:6.5,w:11.733,h:0.4,fontSize:10,color:C.ink3,fontFace:'Microsoft YaHei'});
};

PPT_RENDERERS['conclusion'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const c = ctx.content;
  const sections = [{l:'核心发现',v:c.findings,color:C.green},{l:'战略建议',v:c.strategy,color:C.orange},{l:'下一步行动',v:c.nextSteps,color:C.brand}];
  sections.forEach((sec,i)=>{
    const y = 1.5 + i * 1.9;
    s.addShape(pptx.ShapeType.roundRect, {x:0.8,y:y,w:11.733,h:1.6,rectRadius:0.1,fill:{color:C.bg}});
    s.addShape(pptx.ShapeType.rect, {x:0.8,y:y,w:0.06,h:1.6,fill:{color:sec.color}});
    s.addText(sec.l, {x:1.2,y:y+0.1,w:3,h:0.35,fontSize:14,bold:true,color:sec.color,fontFace:'Microsoft YaHei'});
    s.addText(sec.v||'待补充', {x:1.2,y:y+0.5,w:10.8,h:0.9,fontSize:12,color:C.ink,fontFace:'Microsoft YaHei'});
  });
};

PPT_RENDERERS['thanks'] = function(pptx, title, ctx){
  const s = pptx.addSlide();
  s.background = {color:C.primary};
  s.addText('Thank You', {x:1.5,y:2,w:10.333,h:1.5,fontSize:48,bold:true,color:C.white,align:'center',fontFace:'Microsoft YaHei'});
  s.addShape(pptx.ShapeType.rect, {x:5.5,y:3.7,w:2.333,h:0.04,fill:{color:C.brand}});
  const c = ctx.content;
  s.addText([c.contact||'',c.date||''].filter(Boolean).join(' · '), {x:1.5,y:4.2,w:10.333,h:0.5,fontSize:14,color:C.ink3,align:'center',fontFace:'Microsoft YaHei'});
  s.addShape(pptx.ShapeType.rect, {x:0,y:7.3,w:13.333,h:0.2,fill:{color:C.brand}});
};

/* --- 定量版式渲染器 --- */
const DATA_COLORS = ['12285E','1F5EFF','12805C','E8833A','6D2E46','028090'];
function _parseNum(v){if(!v)return 0;const n=parseFloat(String(v).replace(/[%％]/g,''));return isNaN(n)?0:n;}

PPT_RENDERERS['data-bar'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const c = ctx.content;
  const mode = c.countryMode||1;
  const names = c.countryNames||['总计'];
  const rows = (c.dataRows||[]).filter(r=>r.label);
  if(!rows.length) return;
  if(mode===1){
    const maxW=7, labW=2.5, bx=3.8, by=1.5, rh=0.7;
    const maxVal = Math.max(1,...rows.map(r=>_parseNum(r.values[0])));
    rows.forEach((r,i)=>{
      const y=by+i*rh, val=_parseNum(r.values[0]), bw=(val/maxVal)*maxW;
      s.addText(r.label, {x:0.8,y:y,w:labW,h:0.35,fontSize:11,color:C.ink,fontFace:'Microsoft YaHei'});
      s.addShape(pptx.ShapeType.roundRect, {x:bx,y:y+0.05,w:Math.max(0.1,bw),h:0.3,rectRadius:0.04,fill:{color:C.primary}});
      if(val>0) s.addText(r.values[0]||String(val), {x:bx+bw+0.1,y:y,w:1,h:0.35,fontSize:10,bold:true,color:C.primary,fontFace:'Microsoft YaHei'});
    });
  } else {
    const pw=11.733/mode;
    for(let ci=0;ci<mode;ci++){
      const px=0.8+ci*pw;
      s.addShape(pptx.ShapeType.roundRect, {x:px,y:1.3,w:pw-0.15,h:0.45,rectRadius:0.06,fill:{color:DATA_COLORS[ci]}});
      s.addText(names[ci]||'', {x:px,y:1.3,w:pw-0.15,h:0.45,fontSize:12,bold:true,color:C.white,align:'center',fontFace:'Microsoft YaHei'});
      const maxVal=Math.max(1,...rows.map(r=>_parseNum((r.values||[])[ci])));
      const bw_max=pw-1.8, lbx=px+0.1, bbx=px+1.2, rh=Math.min(0.55,(4.5/rows.length));
      rows.forEach((r,j)=>{
        const y=1.9+j*rh, val=_parseNum((r.values||[])[ci]), bw=(val/maxVal)*bw_max;
        s.addText(r.label, {x:lbx,y:y,w:1,h:0.25,fontSize:8,color:C.ink,fontFace:'Microsoft YaHei'});
        s.addShape(pptx.ShapeType.roundRect, {x:bbx,y:y+0.02,w:Math.max(0.05,bw),h:0.2,rectRadius:0.03,fill:{color:DATA_COLORS[ci]}});
        if(val>0) s.addText(r.values[ci]||'', {x:bbx+bw+0.05,y:y,w:0.7,h:0.25,fontSize:7,bold:true,color:DATA_COLORS[ci],fontFace:'Microsoft YaHei'});
      });
    }
  }
  if(c.insight){s.addShape(pptx.ShapeType.roundRect, {x:0.8,y:6.3,w:11.733,h:0.8,rectRadius:0.08,fill:{color:C.bg}});s.addText('洞察: '+c.insight, {x:1.1,y:6.35,w:11.2,h:0.7,fontSize:10,color:C.ink2,fontFace:'Microsoft YaHei'});}
  if(c.source) s.addText('来源: '+c.source, {x:0.8,y:7.1,w:11,h:0.25,fontSize:8,color:C.ink3,fontFace:'Microsoft YaHei'});
};

PPT_RENDERERS['data-table'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const c = ctx.content;
  const mode = c.countryMode||1;
  const names = c.countryNames||['总计'];
  const rows = (c.dataRows||[]).filter(r=>r.label);
  if(!rows.length) return;
  if(mode===1){
    const hOpts={bold:true,fill:{color:C.primary},color:C.white,align:'center',fontSize:12,fontFace:'Microsoft YaHei'};
    const tRows = [[{text:'指标',options:hOpts},{text:'数值',options:hOpts}]];
    rows.forEach(r=>tRows.push([r.label,r.values[0]||'—']));
    s.addTable(tRows, {x:0.8,y:1.5,w:11.733,colW:[6,5.733],fontSize:12,border:{pt:0.5,color:'E0E0E0'},fontFace:'Microsoft YaHei'});
  } else {
    const cw=11.733/(mode+1), colW=[cw,...Array(mode).fill(cw)];
    const hOpts={bold:true,fill:{color:C.primary},color:C.white,align:'center',fontSize:11,fontFace:'Microsoft YaHei'};
    const header=[{text:'指标',options:hOpts}];
    for(let ci=0;ci<mode;ci++) header.push({text:names[ci]||'',options:{...hOpts,fill:{color:DATA_COLORS[ci]}}});
    const tRows=[header];
    rows.forEach(r=>{const row=[r.label];for(let ci=0;ci<mode;ci++) row.push((r.values||[])[ci]||'—');tRows.push(row);});
    s.addTable(tRows, {x:0.8,y:1.5,w:11.733,colW:colW,fontSize:11,border:{pt:0.5,color:'E0E0E0'},fontFace:'Microsoft YaHei'});
  }
  if(c.insight){s.addShape(pptx.ShapeType.roundRect, {x:0.8,y:6.3,w:11.733,h:0.8,rectRadius:0.08,fill:{color:C.bg}});s.addText('洞察: '+c.insight, {x:1.1,y:6.35,w:11.2,h:0.7,fontSize:10,color:C.ink2,fontFace:'Microsoft YaHei'});}
  if(c.source) s.addText('来源: '+c.source, {x:0.8,y:7.1,w:11,h:0.25,fontSize:8,color:C.ink3,fontFace:'Microsoft YaHei'});
};

PPT_RENDERERS['data-stacked'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const c = ctx.content;
  const mode = c.countryMode||1;
  const names = c.countryNames||['总计'];
  const rows = (c.dataRows||[]).filter(r=>r.label);
  const segLabels = (c.segLabels||'').split(',').map(x=>x.trim()).filter(Boolean);
  const segColors = [C.primary,C.brand,C.green,C.orange,'6D2E46','028090'];
  if(!rows.length) return;
  if(mode===1){
    const bx=3.5, bw=7.5, by=1.5, rh=0.9, labW=2.5;
    rows.forEach((r,i)=>{
      const y=by+i*rh;
      s.addText(r.label, {x:0.8,y:y+0.1,w:labW,h:0.3,fontSize:11,bold:true,color:C.ink,fontFace:'Microsoft YaHei'});
      const vals=(r.values||[]).map(v=>_parseNum(v));
      const total=vals.reduce((a,b)=>a+b,0)||1;
      let cx=bx;
      vals.forEach((v,si)=>{const sw=(v/total)*bw;if(sw>0.05){s.addShape(pptx.ShapeType.rect, {x:cx,y:y+0.05,w:sw,h:0.35,fill:{color:segColors[si%segColors.length]}});if(sw>0.5) s.addText(Math.round(v/total*100)+'%', {x:cx,y:y+0.05,w:sw,h:0.35,fontSize:9,bold:true,color:C.white,align:'center',fontFace:'Microsoft YaHei'});cx+=sw;}});
      if(segLabels.length) s.addText(vals.map((v,si)=>segLabels[si]+':'+(r.values||[])[si]).join('  '), {x:bx,y:y+0.45,w:bw,h:0.25,fontSize:8,color:C.ink2,fontFace:'Microsoft YaHei'});
    });
    // Legend
    if(segLabels.length){const ly=by+rows.length*rh+0.2;segLabels.forEach((lb,i)=>{s.addShape(pptx.ShapeType.rect, {x:bx+i*2,y:ly,w:0.2,h:0.2,fill:{color:segColors[i%segColors.length]}});s.addText(lb, {x:bx+i*2+0.25,y:ly,w:1.5,h:0.2,fontSize:9,color:C.ink,fontFace:'Microsoft YaHei'});});}
  } else {
    const pw=11.733/mode;
    for(let ci=0;ci<mode;ci++){
      const px=0.8+ci*pw;
      s.addShape(pptx.ShapeType.roundRect, {x:px,y:1.3,w:pw-0.15,h:0.45,rectRadius:0.06,fill:{color:DATA_COLORS[ci]}});
      s.addText(names[ci]||'', {x:px,y:1.3,w:pw-0.15,h:0.45,fontSize:12,bold:true,color:C.white,align:'center',fontFace:'Microsoft YaHei'});
      const bw=pw-1.5, bbx=px+1.2, rh=Math.min(0.7,(4.5/rows.length));
      rows.forEach((r,j)=>{
        const y=1.9+j*rh;
        s.addText(r.label, {x:px+0.1,y:y+0.1,w:1,h:0.25,fontSize:8,color:C.ink,fontFace:'Microsoft YaHei'});
        const vals=(r.values||[]).map(v=>_parseNum(v));
        const total=vals.reduce((a,b)=>a+b,0)||1;
        let cx=bbx;
        vals.forEach((v,si)=>{const sw=(v/total)*bw;if(sw>0.03){s.addShape(pptx.ShapeType.rect, {x:cx,y:y+0.05,w:sw,h:0.25,fill:{color:segColors[si%segColors.length]}});if(sw>0.4) s.addText(Math.round(v/total*100)+'%', {x:cx,y:y+0.05,w:sw,h:0.25,fontSize:7,bold:true,color:C.white,align:'center',fontFace:'Microsoft YaHei'});cx+=sw;}});
      });
    }
    if(segLabels.length){const ly=1.9+rows.length*Math.min(0.7,(4.5/rows.length))+0.2;segLabels.forEach((lb,i)=>{s.addShape(pptx.ShapeType.rect, {x:0.8+i*2,y:ly,w:0.2,h:0.2,fill:{color:segColors[i%segColors.length]}});s.addText(lb, {x:0.8+i*2+0.25,y:ly,w:1.5,h:0.2,fontSize:9,color:C.ink,fontFace:'Microsoft YaHei'});});}
  }
  if(c.insight){s.addShape(pptx.ShapeType.roundRect, {x:0.8,y:6.3,w:11.733,h:0.8,rectRadius:0.08,fill:{color:C.bg}});s.addText('洞察: '+c.insight, {x:1.1,y:6.35,w:11.2,h:0.7,fontSize:10,color:C.ink2,fontFace:'Microsoft YaHei'});}
  if(c.source) s.addText('来源: '+c.source, {x:0.8,y:7.1,w:11,h:0.25,fontSize:8,color:C.ink3,fontFace:'Microsoft YaHei'});
};

PPT_RENDERERS['data-grouped'] = function(pptx, title, ctx){
  const s = pptx.addSlide(); s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  const c = ctx.content;
  const mode = c.countryMode||1;
  const names = c.countryNames||['总计'];
  const rows = (c.dataRows||[]).filter(r=>r.label);
  if(!rows.length) return;
  if(mode===1){
    const bx=3.5, maxBW=7, by=1.5, rh=0.7, barH=0.35;
    const maxVal=Math.max(1,...rows.map(r=>_parseNum(r.values[0])));
    rows.forEach((r,i)=>{
      const y=by+i*rh, val=_parseNum(r.values[0]), bw=(val/maxVal)*maxBW;
      s.addText(r.label, {x:0.8,y:y,w:2.5,h:barH,fontSize:11,color:C.ink,fontFace:'Microsoft YaHei'});
      s.addShape(pptx.ShapeType.roundRect, {x:bx,y:y+0.02,w:Math.max(0.1,bw),h:barH-0.04,rectRadius:0.04,fill:{color:C.primary}});
      if(val>0) s.addText(r.values[0]||String(val), {x:bx+bw+0.1,y:y,w:1,h:barH,fontSize:10,bold:true,color:C.primary,fontFace:'Microsoft YaHei'});
    });
  } else {
    const chartL=1.0, chartR=12.5, chartW=chartR-chartL;
    const groupW=chartW/rows.length, barW=Math.min(0.5,(groupW*0.7)/(mode));
    const chartT=1.8, chartB=5.8, chartH=chartB-chartT;
    const allVals=rows.flatMap(r=>(r.values||[]).map(v=>_parseNum(v)));
    const maxVal=Math.max(1,...allVals);
    // Grid lines
    for(let g=0;g<=4;g++){const gy=chartB-(g/4)*chartH;s.addShape(pptx.ShapeType.rect, {x:chartL,y:gy,w:chartW,h:0.005,fill:{color:'E0E0E0'}});s.addText(Math.round(maxVal*g/4)+'%', {x:chartL-0.5,y:gy-0.1,w:0.45,h:0.2,fontSize:8,color:C.ink3,align:'right',fontFace:'Microsoft YaHei'});}
    rows.forEach((r,gi)=>{
      const gx=chartL+gi*groupW+groupW/2;
      s.addText(r.label, {x:gx-groupW/2,y:chartB+0.1,w:groupW,h:0.3,fontSize:9,color:C.ink,align:'center',fontFace:'Microsoft YaHei'});
      for(let ci=0;ci<mode;ci++){
        const val=_parseNum((r.values||[])[ci]);
        const bh=(val/maxVal)*chartH;
        const bx=gx-(mode*barW)/2+ci*barW;
        s.addShape(pptx.ShapeType.roundRect, {x:bx,y:chartB-bh,w:barW-0.03,h:Math.max(0.02,bh),rectRadius:0.03,fill:{color:DATA_COLORS[ci]}});
        if(val>0) s.addText(r.values[ci]||'', {x:bx-0.1,y:chartB-bh-0.22,w:barW+0.2,h:0.2,fontSize:7,bold:true,color:DATA_COLORS[ci],align:'center',fontFace:'Microsoft YaHei'});
      }
    });
    // Legend
    for(let ci=0;ci<mode;ci++){s.addShape(pptx.ShapeType.rect, {x:chartL+ci*1.8,y:1.35,w:0.2,h:0.2,fill:{color:DATA_COLORS[ci]}});s.addText(names[ci]||'', {x:chartL+ci*1.8+0.25,y:1.35,w:1.4,h:0.2,fontSize:9,color:C.ink,fontFace:'Microsoft YaHei'});}
  }
  if(c.insight){s.addShape(pptx.ShapeType.roundRect, {x:0.8,y:6.3,w:11.733,h:0.8,rectRadius:0.08,fill:{color:C.bg}});s.addText('洞察: '+c.insight, {x:1.1,y:6.35,w:11.2,h:0.7,fontSize:10,color:C.ink2,fontFace:'Microsoft YaHei'});}
  if(c.source) s.addText('来源: '+c.source, {x:0.8,y:7.1,w:11,h:0.25,fontSize:8,color:C.ink3,fontFace:'Microsoft YaHei'});
};

function renderDefaultSlide(pptx, title, ctx){
  const s = pptx.addSlide();
  s.background = {color:C.white};
  addHeader(s, pptx, title, ctx.content?.hypo);
  s.addText('内容待补充', {x:3,y:3,w:7,h:1,fontSize:18,color:C.ink3,align:'center'});
}
