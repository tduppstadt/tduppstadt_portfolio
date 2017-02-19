// Modified version
// Copyright (c) 2010 Nicholas C. Zakas. All rights reserved.
// MIT License
// http://www.nczonline.net/blog/2010/03/09/custom-events-in-javascript/



/*
    USAGE:
    // declare events strings for record or reference. if you do not declare them 
    // it will automatically be generated on using addListener and fire methods
    window.tEvent.eventStr.MY_CLICK = "MY_CLICK";


    // dispatch an event
    window.tEvent.fire("MY_CLICK", {myName:"a random button"});


    // listen for event
    window.tEvent.addListener("MY_CLICK", function(evt, data)
    {
        console.log("My event Info:", evt);
        console.log("My data:", data);
    });
    

    UPDATE: You can also listen to a fire an array of events
    window.tEvent.fire(["MY_CLICK1", "MY_CLICK2"], {myName:"a random button"});

    window.tEvent.addListener(["MY_CLICK1", "MY_CLICK2"], function(evt, data)
    {
        console.log("My event Info:", evt);
        console.log("My data:", data);
    });

    NOTE: Please note that if you fire and array of events and have a 
    listener listening to the same list of events, each event in the array
    will fire off an even making the listener call multiple times. Although 
    this is the expected behavior you should avoid firing and listening to the
    same event array.

 */

function EventTarget(){
    this._listeners = {};
    this.eventStr = {};   
}

EventTarget.prototype = 
{

    constructor: EventTarget,

    addListener: function(type, listener)
    {
        if (typeof type === "string") type = [type]; 
  
        for (var i = 0; i < type.length; i++)
        {
          this.eventStr[type[i]] = type[i];
        if (typeof this._listeners[type[i]] == "undefined"){
            this._listeners[type[i]] = [];
        }

        this._listeners[type[i]].push(listener);
          
        }
        
    },

    fire: function(events, data)
    {
        if (typeof events == "string") events = [events]; 
      
        var event;
        for (var n = 0; n < events.length; n++)
        {   
          event = { type: events[n] };
          if (!event.target){
              event.target = this;
          }

           if (!event.type){  //falsy
              throw new Error(" EventTarget: Event object missing 'type' property.");
          }

          if (this._listeners[event.type] instanceof Array){
              this.eventStr[event.type] = event.type;
              var listeners = this._listeners[event.type];
              for (var i=0, len=listeners.length; i < len; i++){
                  listeners[i].call(this, event, data);
              }
          }
        }
    },

    removeListener: function(type, listener)
    {      
        if (this._listeners[type] instanceof Array){
            var listeners = this._listeners[type];
            for (var i=0, len=listeners.length; i < len; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }
};

if (window.tEvent === undefined)
{
    window.tEvent = new EventTarget();
}