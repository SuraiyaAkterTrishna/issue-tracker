document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

/* const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  let currentIssue = issues.find(issue => issue.id === id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
} */

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id === id);

  if (currentIssue) {
    currentIssue.status = 'Closed';
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
  }
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id !== id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i];

    const issueElement = document.createElement('div');
    issueElement.classList.add('well');
    issueElement.innerHTML = `
      <h6>Issue ID: ${issue.id}</h6>
      <p><span class="label label-info">${issue.status}</span></p>
      <h3>${issue.description}</h3>
      <p><span class="glyphicon glyphicon-time"></span>${issue.severity}</p>
      <p><span class="glyphicon glyphicon-user"></span>${issue.assignedTo}</p>
      <a href="#" onclick="closeIssue('${issue.id}')" class="btn btn-warning">Close</a>
      <a href="#" onclick="deleteIssue('${issue.id}')" class="btn btn-danger">Delete</a>
    `;

    issuesList.appendChild(issueElement);
  }
}







