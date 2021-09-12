// ws://192.168.43.186:9090

var app = new Vue({
    el: '#app',
    // storing the state of the page
    data: {
        connected: false,
        ros: null,
        ws_address: 'ws://192.168.43.186:9090',
        logs: []        
    },

    //helper methods to connect to ROS
    methods: {
        connect: function() {
            console.log('Connect to rosbridge server!!')
            this.logs.unshift('Connect to rosbridge server!!')
            this.ros = new ROSLIB.Ros({
                url: this.ws_address
            })

            this.ros.on('connection', () => {
                this.connected = true
                console.log('Connected')
                this.logs.unshift ('Connected')
            })

            this.ros.on('error', (error) => {
                console.log('Error connecting to websocket server: ', error)
                this.logs.unshift('Error connecting to websocket server')
            })

            this.ros.on('close', () => {
                this.connected = false
                console.log('Connection to websocket server closed.')
                this.logs.unshift('Connection to websocket server closed')
            })
        },
        disconnect: function() {
            this.ros.close()
        }
    },
})