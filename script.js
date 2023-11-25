
function saveIssue(e){
    //getting the input values from the form
    var issueId = chance.guid(); //Unique issue identifier //internet required to call chancejs
    var issueDesc = document.getElementById('issueDesc').value;
    var issueSeverity = document.getElementById('issueSev').value;
    var issueAssignTo = document.getElementById('issueAssign').value;
    var issueStatus = 'Open';
    var today = new Date();
  //Json type object created to store it into localStroage
    var issue = {
      id:issueId,
      description:issueDesc,
      severity:issueSeverity,
      assignTo:issueAssignTo,
      status:issueStatus,
      date: today.toLocaleString("en-US")
    }
    var issues = [];
  //Verifying the item in localStorage
    if(localStorage.issues){
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  //Reseting the input form
    document.getElementById('issueInputForm').reset();
  //fetchIssues() function called to reflect changes
    fetchIssues();
  //e.preventDefault() will prevent the form from the default submit action
    e.preventDefault();
  }
  
  function fetchIssues(){
    var issues = [];
    //Verifying the item in localStorage
    if(localStorage.issues){
        //parsing the storage JSON data
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    var issuesList = document.getElementById('issueList');
    issuesList.innerHTML = '';
    //generating html for each issue card
    for(var i=0; i<issues.length; i++){
      var id = issues[i].id;
      var desc = issues[i].description;
      var severity = issues[i].severity;
      var assignTo = issues[i].assignTo;
      var status = issues[i].status;
      var date = issues[i].date;
      issuesList.innerHTML += '<div class="well bg-info">' +
                              '<h6> ISSUE ID: #' + id + '</h6>' +
                              '<p><span class="label label-info">' + status + '</span>  '+
                              '<span class="label label-info">' + date +'</span></p>' +
                              '<h4>' + desc + '</h4>' +
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+ '<span class="glyphicon glyphicon-user"></span> ' + assignTo + '</p>' +
                              '<a href="#" class="btn btn-warning" onClick="setStatusClosed(\''+ id +'\')">Close</a>' +
                              ' <a href="#" class="btn btn-danger" onClick="deleteIssue(\'' + id + '\')">Delete</a>' +
                              '</div>';
  
    }
  }
  
  function setStatusClosed(id){
    //parsing the JSON data
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(var x = 0; x<issues.length; x++){
      if(issues[x].id == id){
        issues[x].status = "Closed";
      }
    }
    localStorage.setItem('issues',JSON.stringify(issues));
    fetchIssues();
  }
  
  function deleteIssue(id){
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(var n = 0; n<issues.length; n++){
      //identifying the particular issue id to delete
      if(issues[n].id == id){
        issues.splice(n,1);
      }
    }
    localStorage.setItem('issues',JSON.stringify(issues));
    fetchIssues();
  }
