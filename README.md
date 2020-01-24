# PWA-Desktop

Example with Desktop PWA. Without additional libraries and megatons of unnecessary junk from Nodes.

## Prerequisites

This example does not require special installation and works on the local machine, which is very convenient.
You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/) (optional)
* [PHP](https://www.php.net/downloads.php)
* [Python](https://www.python.org/)
* [Apache](https://httpd.apache.org/download.cgi) Linux or [Apache for Windows](https://apache-windows.ru/)
* [NGINX](https://nginx.org/)
PS: Choose your own server suitable for you.

## Installation

### Variants:
* `git clone https://github.com/VicLo2020/pwa-desktop.git`, this repository
* Download ZIP and unpack into the new directory

## Running / Development

You can launch local project
Start:
* chrome.exe --unsafely-treat-insecure-origin-as-secure=http://localhost
* php -S localhost:80 -t {path to project}
* cd {path to project}, python -m http.server 80 --bind 127.0.0.1
* Visit your app at [http://localhost:80](http://localhost:80).

### Building

* Not necessary.

### Use

1. Visit your app at [http://localhost:80](http://localhost:80).
2. If this is your first time on a page, you need to wait about 30 seconds. 

 * A button will appear for installing the application.
 * Or just click the "+" button located on the right in the address bar.
 * The application will be installed on your desktop. Now you can launch the application from the desktop.

### Uninstall
1. Uninstall an PWA application:
2. Go to the address [chrome://apps](chrome://apps). 
3. Right-click on the application to be deleted and select "uninstall application". 
4. Check the box - delete data. 
5. Click the "Delete" button. The application will be removed from the desktop.
