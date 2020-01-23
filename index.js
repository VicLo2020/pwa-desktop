const PUBLIC_URL = 'http://localhost:80';

navigator.browserSpecs = (function(){
    let ua = navigator.userAgent, tem, 
      M = ua.match(/(opera|chrome|android|safari|firefox|msie|samsung|trident(?=\/))\/?\s*(\d+)/i) || [];

    let mobile = ua.match(/(mobile|tablet)/i) || [];  
    mobile = mobile.length ? mobile[0] : 'desktop';
    state = 'detected';
    if(/trident/i.test(M[1])){
        tem = /\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'IE', version:(tem[1]||''), state: state, device: mobile};
    }   
    if(M[1]==='Chrome'){
        tem = ua.match(/\bOPR|Edge\/(\d+)/)
        if(tem!=null) {return {name:'Opera', version:tem[1], state: state, device: mobile};}
    }   
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if( (tem =ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    if( M.length > 3 ) return { name: M[0], version: M[1], state: M[2], device: mobile };
    return {
      name: M[0],
      version: M[1],
      state: state,
      device: mobile
    };
})();

if( (navigator.browserSpecs.name == 'Chrome' && navigator.browserSpecs.version >= 61) 
  ||(navigator.browserSpecs.name == 'Android' && navigator.browserSpecs.version >= 56)
  ||(navigator.browserSpecs.name == 'Samsung' && navigator.browserSpecs.version >= 5)
  ||(navigator.browserSpecs.name == 'Firefox' && navigator.browserSpecs.version >= 41 
    && navigator.browserSpecs.device != 'desktop' ) )
{
  isInWebAppiOS = (window.navigator.standalone == true);
  isInWebAppChrome = (window.matchMedia('(display-mode: standalone)').matches);

  if ( !isInWebAppiOS && !isInWebAppChrome && 'serviceWorker' in navigator ) {
    // Supported!
    const classApp = new App( document );
    classApp.componentInstall();
    register(); // serviceWorker.js 
  }
}
