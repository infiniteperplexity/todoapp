class MobilePanel extends React.Component {
  render() {
    return (
      <div className="frame">
        <MobileMenu {...this.props}/>
        <MobileToolbar {...this.props}/>
        <MobileTasks {...this.props}/>
      </div>
    );
  }
}

class MobileMenu extends React.Component {
  handleChange = (e)=>{
    this.props.chooseList(e.target.value);
  }
  render() {
    let statics = [
      "$Inbox",
      "$Calendar",
      "$Complete",
      "$Tasks",
      "$Lists"
    ];
    let tasks = this.props.tasks;
    let lists = tasks.$Lists.subtasks;
    let list = statics.concat(lists).map((e,i)=><option key={i} value={e}>{tasks[e].label}</option>);
    if (lists.length>0) {
      list.splice(statics.length, 0, <option key="-1" disabled="true">---------------------</option>)
    }
    return (
      <select value={this.props.list} onChange={this.handleChange}>
        {list}
      </select>
    );
  }
}

class MobileToolbar extends React.Component {
  // handleClick = (e)=>{
  //   let text = this._textInput.value;
  //   if (text) {
  //     let list = this.props.list;
  //     let task = this.props.tasks[list];
  //     this.props.addTask(this.props.newTask({label: text, lists: [list]}));
  //     this._textInput.value = "";
  //   }
  // }
  handleAdd = (e)=>{
    e.preventDefault();
    let text = this._textInput.value;
    if (text) {
      let task = this.props.newTask({label: text});
      // if the list is an autofilter, create a new task that fits the fitler
      if (autofilters[this.props.list]) {
        let auto = autofilters[this.props.list];
        let updates = auto.update(task, this.props.tasks);
        this.props.modifyTasks(updates);
      } else {
        // otherwise add an unmodified new task
        let list = clone(this.props.tasks[this.props.list]);
        if (!list.subtasks) {
          list.subtasks = [];
        }
        list.subtasks.push(task.id);
        this.props.modifyTasks([
          task,
          list
        ]);
      }
      this._textInput.value = "";
    }
  }
  render() {
    return (
      <div>
        <input ref={e=>this._textInput=e} type="text" style={{width: "99%"}}/>
        <br/>
        <button onClick={this.handleAdd}>Add Task</button>
      </div>
    );
  }
}

function MobileTasks(props, context) {
  let {tasks, list} = props;
  let listed = tasks[list].subtasks.map((e,i)=><div key={i} style={{backgroundColor: (i%2)===0 ? "#ffffee" : "#eeeeff"}}>{tasks[e].label}</div>);
  return (
    <div >
      {listed}
    </div>
  );
}