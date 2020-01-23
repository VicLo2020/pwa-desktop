var itemName = 'install';

class App {

    constructor(d) {
        this.state = {
            readyToAdd: true,
            successfullyInstalled: false,
            acceptedInstall: false,
            canceledInstall: false
        };
        this.doc = d;
	window.selfApp = this;
	let isInWebAppiOS = (window.navigator.standalone == true);
  	let isInWebAppChrome = (window.matchMedia('(display-mode: standalone)').matches);

  	this.sandalone = isInWebAppiOS == true || isInWebAppChrome == true;
    }

    componentInstall() {
        // check if user is already running app from home screen
        if ( this.sandalone == true ) {
            console.log('App is already installed and running in standalone');
            this.state.successfullyInstalled = true;

        } else {
            window.addEventListener('beforeinstallprompt', e => {
                console.log('Event: beforeinstallprompt', e);
                // Prevent Chrome 67 and earlier from automatically showing the prompt
                e.preventDefault();

		if( window.selfApp.showAddButton() ) {
                // Stash the event so it can be triggered later.
                  window.deferredPrompt = e;

  		  document.getElementById('install').addEventListener('click', 
			(e) => { window.selfApp.addToHome(); } );

		// Chrome: We must wait above 30 sec, else Install prompt don't showing.	
	          setTimeout(function() {
		    let btn = document.getElementById('install');
        	    btn.style.display = 'inline';
		  }, 3000);
                }

            });
            // this event fires only when app is installed
            window.addEventListener('appinstalled', e => {
                console.log('Event: appinstalled', e);
                console.log('PWM App was successfully installed');
                window.selfApp.state.successfullyInstalled = true;
	        document.getElementById('install').style.display = 'none';
		//document.cookie = "PWA_installed=true; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
            });
        }
    }

    addToHome() {
        // Show the prompt
        if (deferredPrompt) {

            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then(choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('PWM prompt: ACCEPTED');
                    window.selfApp.state.acceptedInstall = true;

                } else {
                    console.log('PWM prompt: CANCELED');
                    window.selfApp.state.canceledInstall = true;
                }
	        document.getElementById('install').style.display = 'none';
                deferredPrompt = null;
            });
        }
    }

    showAddButton() {
        let showButton =
            this.state.readyToAdd &&
            !this.state.successfullyInstalled &&
            !this.state.acceptedInstall &&
            !this.state.canceledInstall;
        console.log('Show add button', showButton);
        return showButton;
    }

}
