const posts = [
    {title:'Post One',body:'This is post one'},
    {title:'Post Two',body:'This is post two'}
]

function getPosts(){
    setTimeout(()=>{
        let output = '';
        posts.forEach((post,index)=>{
            output += `<li>${post.title}</li>`
        });
        document.body.innerHTML = output;
    },1000);
}

function createPosts (post){
    setTimeout(()=>{
        posts.push(post);
        console.log("hello");
    },2000)
}

function createPosts (post,callbacks){
    setTimeout(()=>{
        posts.push(post);
       callbacks();
    },2000)
}

getPosts();
createPosts( {title:'Post Three',body:'This is post three'});
To handle this situation callbacks created

createPosts( {title:'Post Three',body:'This is post three'},getPosts);
