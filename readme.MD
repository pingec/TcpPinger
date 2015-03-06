
TcpPinger
============

"Tcp-pings" hosts on configurable ports and intervals and sends email notifications when they are down.


1. Create a config.js with your settings. For example:

    ```js
       var config = [
        {
            host: "google.com",
            port: 80, //tcp port
            notifyEmail: "john.smith@gmail.com", //or leave it undefined to be notified via console only
            interval: 15000,    //delay before "pinging" again (milliseconds)
            timeout: 2000       //how long to wait for reply (milliseconds)
        },
        {
            host: "google.com",
            port: 666,        
            notifyEmail: "john.smith@gmail.com",
            interval: 60000,
            timeout: 2000
        },
        {
            host: "yahoo.com",
            port: 80,
            interval: 15000,
            timeout: 2000
        }
    ];
    module.exports = config;
    ```    

2. Create emailConf.js with following settings:

    ```js
    //nodemailer settings
    module.exports = {
        service : 'Gmail',
        auth : {
            user: 'john.smith@gmail.com',
            pass: 'johnsmithspassword'
        },
        from: 'John Smith Automation <john.smith@gmail.com>'
    };
    ```

3. Run 'node main.js'