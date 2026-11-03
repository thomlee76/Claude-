F='font-family="Oswald, Arial Narrow, sans-serif" font-weight="700"'
F5='font-family="Oswald, Arial Narrow, sans-serif" font-weight="500"'
J='font-family="IPAGothic, sans-serif"'
def S(b,d=''): return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs>{d}</defs>{b}</svg>'
PLANE=lambda x,y,s,c,r=0:f'<g transform="translate({x} {y}) rotate({r}) scale({s})"><path d="M-30 0h18l32-28 11 4-20 32h30l9-11 9 2-4 21 4 21-9 2-9-11h-30l20 32-11 4-32-28h-18z" fill="{c}"/></g>'
BAR=lambda x,y,w,h,c,id:f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="url(#{id})"/>'
def bc(id,c): return f'<pattern id="{id}" width="9" height="40" patternUnits="userSpaceOnUse"><rect width="3" height="40" fill="{c}"/><rect x="5" width="1.6" height="40" fill="{c}"/></pattern>'
def ticket(x,y,w,h,r=22,n=24,cut=None,fill='#fff',dash='#C9D3EE'):
    cut=cut or x+w*.68
    return (f'<path d="M{x+r} {y}H{cut-n}a{n} {n} 0 0 0 {2*n} 0H{x+w-r}a{r} {r} 0 0 1 {r} {r}V{y+h-r}a{r} {r} 0 0 1 -{r} {r}H{cut+n}a{n} {n} 0 0 0 -{2*n} 0H{x+r}a{r} {r} 0 0 1 -{r} -{r}V{y+r}a{r} {r} 0 0 1 {r} -{r}z" fill="{fill}"/>'
            f'<path d="M{cut} {y+n+6}V{y+h-n-6}" stroke="{dash}" stroke-width="4" stroke-dasharray="10 9"/>')
o={}
o[1]=S('<rect width="512" height="512" fill="url(#g1)"/><g transform="rotate(-8 256 256)">'+ticket(46,150,420,212)+
 f'<text x="74" y="190" {F5} font-size="22" fill="#8A97C4" letter-spacing="3">FROM</text><text x="222" y="190" {F5} font-size="22" fill="#8A97C4" letter-spacing="3">TO</text>'+
 f'<text x="120" y="320" text-anchor="middle" {F} font-size="130" fill="#1D2B64">A</text><text x="262" y="314" text-anchor="middle" {J} font-size="104" fill="#E8333F">あ</text>'+
 '<path d="M172 270h40m-14-14l14 14-14 14" stroke="#2F6BFF" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+PLANE(392,220,1.05,'#2F6BFF')+BAR(362,282,64,40,'#1D2B64','b1')+'</g>',
 '<linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4C8DFF"/><stop offset="1" stop-color="#2440D8"/></linearGradient>'+bc('b1','#1D2B64'))
o[2]=S('<rect width="512" height="512" fill="#141A33"/><g transform="rotate(8 256 256)"><path d="M156 40h200a22 22 0 0 1 22 22v250a24 24 0 0 0 0 48v110a22 22 0 0 1-22 22H156a22 22 0 0 1-22-22V360a24 24 0 0 0 0-48V62a22 22 0 0 1 22-22z" fill="#FFC65C"/>'
 '<path d="M150 336h212" stroke="#B88420" stroke-width="4" stroke-dasharray="10 9"/>'+
 f'<text x="256" y="160" text-anchor="middle" {F} font-size="110" fill="#141A33">A</text>'+PLANE(256,196,.62,'#141A33',90)+f'<text x="256" y="304" text-anchor="middle" {J} font-size="84" fill="#C22A4B">あ</text>'+
 BAR(196,384,120,52,'#141A33','b2')+'</g>',bc('b2','#141A33'))
o[3]=S('<rect width="512" height="512" fill="#EDEFF5"/><g transform="rotate(-8 256 256)" filter="url(#sh3)">'+ticket(46,150,420,212,cut=320)+
 '<path d="M68 150h115v212H68a22 22 0 0 1-22-22V172a22 22 0 0 1 22-22z" fill="#1D2B64"/>'
 f'<text x="114" y="304" text-anchor="middle" {F} font-size="130" fill="#fff">A</text><circle cx="252" cy="256" r="58" fill="#E8333F"/><text x="252" y="290" text-anchor="middle" {J} font-size="88" fill="#fff">あ</text>'+
 PLANE(392,232,1,'#1D2B64')+BAR(362,282,64,40,'#1D2B64','b3')+'</g>',
 bc('b3','#1D2B64')+'<filter id="sh3" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#1D2B64" flood-opacity=".3"/></filter>')
o[4]=S('<rect width="512" height="512" fill="url(#g4)"/>'+ticket(40,232,432,210,cut=338)+
 '<path d="M110 236C170 90 330 90 392 210" stroke="#fff" stroke-width="6" fill="none" stroke-dasharray="4 14" stroke-linecap="round"/>'+PLANE(250,124,1.1,'#fff',8)+
 f'<text x="130" y="392" text-anchor="middle" {F} font-size="130" fill="#1D2B64">A</text><path d="M196 342h52m-16-16l16 16-16 16" stroke="#FF8A4C" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
 f'<text x="282" y="386" text-anchor="middle" {J} font-size="96" fill="#E8333F">あ</text>'+BAR(368,362,64,40,'#1D2B64','b4')+f'<text x="400" y="320" text-anchor="middle" {F5} font-size="34" fill="#1D2B64">B1</text><text x="400" y="352" text-anchor="middle" {F5} font-size="22" fill="#8A97C4">N5</text>',
 '<linearGradient id="g4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF9A6B"/><stop offset="1" stop-color="#FF5F7E"/></linearGradient>'+bc('b4','#1D2B64'))
def small(x,y,r,fill,txt,ff,fs,tc):
    return f'<g transform="rotate({r} {x+150} {y+90})">'+ticket(x,y,300,180,r=20,n=20,cut=x+214,fill=fill,dash='rgba(255,255,255,.6)')+f'<text x="{x+108}" y="{y+128}" text-anchor="middle" {ff} font-size="{fs}" fill="{tc}">{txt}</text>'+PLANE(x+256,y+90,.7,tc,90)+'</g>'
o[5]=S('<rect width="512" height="512" fill="#F6F3EC"/>'+small(40,92,-14,'#2F6BFF','A',F,120,'#fff')+small(170,250,10,'#E8333F','あ',J,104,'#fff'))
o[6]=S('<rect width="512" height="512" fill="url(#g6)"/>'+''.join(f'<circle cx="{x}" cy="{y}" r="2" fill="#fff" opacity=".6"/>' for x,y in [(60,60),(420,90),(300,40),(150,120),(470,190)])+
 '<g transform="rotate(-8 256 270)">'+ticket(46,170,420,212,cut=344,fill='#10152A',dash='#FFC65C')+
 f'<text x="122" y="336" text-anchor="middle" {F} font-size="130" fill="#FFC65C" filter="url(#gw6)">A</text><text x="262" y="332" text-anchor="middle" {J} font-size="104" fill="#FF7EA6" filter="url(#gw6)">あ</text>'+
 '<path d="M176 286h40m-14-14l14 14-14 14" stroke="#2FE6C8" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+PLANE(404,240,1,'#2FE6C8')+BAR(372,300,64,40,'#FFC65C','b6')+'</g>',
 '<linearGradient id="g6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B0E22"/><stop offset="1" stop-color="#2A1A4A"/></linearGradient>'+bc('b6','#FFC65C')+'<filter id="gw6" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>')
for k,v in o.items(): open(f'n{k}.svg','w').write(v)
