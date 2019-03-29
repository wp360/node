console.log('前');
// 回调地狱
// getUser(1, (user)=> {
//     console.log('User', user);
//     // Get the repositories
//     getRepositories(user.gitHubUsername, (repos)=>{
//        // console.log('Repos', repos);
//        getCommits(repo, displayCommits);
//     });
// });

// getUser(1, getRepositories);
// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits', commits))
//     .catch(err => console.log('Error', err.message));

// Async and Await approach
// try - catch
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (err) {
        console.log('Error', err.message);
    }
}
displayCommits();

console.log('后');

// Callbacks
// Promises
// Async/await
// 命名函数解决callback问题
// function getRepositories(user) {
//     getRepositories(user.gitHubUsername, getCommits);
// }

// function getCommits(repos) {
//     getCommits(repo, displayCommits);
// }

// function displayCommits(commits) {
//     console.log(commits);
// }

// Synchronous 同步
// console.log('前');
// const user = getUser(1);
// const repos = getRepositories(user.gitHubUsername);
// const commits = getCommits(repos[0]);
// console.log('后');

// function getUser(id, callback) {
//     setTimeout(() => {
//         console.log('从数据库读取一个用户信息');
//         callback({id: id, gitHubUsername: 'mosh'});
//         // return { id: id, gitHubUsername: 'mosh' };
//     },2000);
// }

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('从数据库读取一个用户信息');
            resolve({id: id, gitHubUsername: 'mosh'});
        },2000);
    });
}

// function getRepositories(username, callback) {
//     setTimeout(()=>{
//         console.log('Calling GitHub API...');
//         callback(['repo1','repo2','repo3']);
//     },2000);
// }

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('Calling GitHub API...');
            // resolve(['repo1','repo2','repo3']);
            reject(new Error('Could not get the repos.'));
        },2000);
    });
}

// function getCommits(repo, callback) {
//     setTimeout(()=>{
//         console.log('Calling GitHub API...');
//         callback(['commit']);
//     },2000);
// }

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('Calling GitHub API...');
            resolve(['commit']);
        },2000);
    });
}

// setTimeout就是一个异步函数或者说非阻塞函数