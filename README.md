# blockLAN
This is a Chrome browser extension designed to prevent requests to LAN IP addresses (192.168.*, 10.*). These types of requests can be a security vulnerability, because they can allow malicious sites to execute requests from a client to the LAN-side of their router or other devices. Many routers have administrative access restricted to the LAN-side of the network as a security feature. However, recent attacks have utilized client browsers to make requests to this LAN-side and then compromise routers from the more vulnerable LAN-side.

This extension should block any request made to an address of 192.168.*. 10.*, or *.local from the Chrome browser (this covers HTTP(S) and FTP protocols), and will popup a notification when it does so. If you are intentionally trying to connect to a LAN IP from your browser, such as to configure your router, you will need to temporarily disable this extension. Future improvements are planned to allow an easier solution for this case.