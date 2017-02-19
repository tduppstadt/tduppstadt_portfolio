// ---------------------------------------------------------------
//
// Notify
//
// ---------------------------------------------------------------
/*

The purpose of this class is to register and be notified as tasks are being completed 
and to be notified when a group of tasks have completed.

see a demo ...
http://jsbin.com/iNoqoma/1/edit

// register task group
window.oNotify.registerTask(
{
  groupName: "MyTasks",
  taskList: ["item1", "item2", "item3"],
  onUpdate: function(itemId)
  {
    console.log("Finished Item:", itemId);
  },
  onDone: function()
  {
     console.log("Your list is completed"); 
  }
});


// update tasks
window.oNotify.MyTasks.update("item1");
window.oNotify.MyTasks.update("item2");
window.oNotify.MyTasks.update("item3");


// abort tasks
window.oNotify.MyTasks.abort();


// get task group status
window.oNotify.MyTasks.status();


// get all task groups status
window.oNotify.status();


// ____________________________________________________

// Recommendations
I would recommend defining the group task name and the individual task Id in static strings

NOTIFY_GROUP_MYTASKS = "MyTasks";
NOTIFY_TASK_ITEM1 = "item1";
window.oNotify[NOTIFY_GROUP_MYTASKS].update(NOTIFY_TASK_ITEM1);

or

nMyTasks = window.oNotify.MyTasks;
nMyTasks.update(NOTIFY_TASK_ITEM1);

Also, define event strings
// use this if more than one task groups exist within the class
NOTIFY_EVENT_MYTASKS_DONE
// shortcut
NOTIFY_EVENT_DONE

*/
(function() 
{
    // ---------------------- 
    // Notify  
    // ----------------------
    var Notify = function() 
    {

    };

    Notify.prototype = 
    {
        // ______________________________________________________________
        //                                                   registerTask
        registerTask: function(data) 
        {
            this[data.groupName] = new Task(data);       
        },

        // ______________________________________________________________
        //                                                         status
        status: function() 
        {
            var result = {};
            for (var key in this) 
            {
                if (key !== "registerTask" && key !== "status") 
                {
                    result[key] = this[key].status();
                }
            }
            return (result);
        }
    };
    window.oNotify = new Notify();


    // ---------------------- 
    // Task  
    // ----------------------
    var Task = function(data) 
    {
        var self = this;

        this.isAborted = false;
        this.taskList = data.taskList;

        this.onUpdate = function(){ return; };
        if (data.onUpdate) this.onUpdate = data.onUpdate;

        this.onDone = function(){ return; };
        if (data.onDone) this.onDone = data.onDone;

        this.completedList = [];
        for (var i = 0; i < this.taskList.length; i++) 
        {
            this.completedList[i] = 0;
        }
    };

    Task.prototype = 
    {
        // ______________________________________________________________
        //                                                         update
        update: function(itemId) 
        {
            // check if aborted
            if (this.isAborted) return;

            // register completed task
            for (var i = 0; i < this.completedList.length; i++) 
            {
                if (this.taskList[i] === itemId) 
                {
                    this.completedList[i] = 1;
                }
            }

            // fire onUpdate
            this.onUpdate(itemId);

            // check if completed
            var completedCount = 0;
            for (i = 0; i < this.completedList.length; i++) 
            {
                if (this.completedList[i] === 1) completedCount++;
            }
            if (completedCount === this.taskList.length) 
            {
                this.onDone();
            }
        },

        // ______________________________________________________________
        //                                                          abort
        abort: function() 
        {
            this.isAborted = true;
        },

        // ______________________________________________________________
        //                                                         status
        status: function() 
        {
            var result = 
            {
                isAborted: this.isAborted,
                isComplete: false,
                tasksPending: [],
                tasksCompleted: []
            };
            var completedCount = 0;
            for (var i = 0; i < this.completedList.length; i++) 
            {
                if (this.completedList[i] === 1) 
                {
                    completedCount++;
                    result.tasksCompleted.push(this.taskList[i]);
                } 
                else 
                {
                    result.tasksPending.push(this.taskList[i]);
                }
            }
            if (completedCount === this.taskList.length) 
            {
                result.isComplete = true;
            }
            return (result);
        }
    };
})();