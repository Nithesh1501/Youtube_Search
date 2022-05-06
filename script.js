let template = document.querySelector('#Video_template').content;

document.querySelector("#search-button").addEventListener("click", function () {
    if (document.querySelector("#search-query").value == "") {
        alert("Please enter a search term");
        return
    }
    document.querySelector(".main").innerHTML = "";
    fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyB0Yem1_WTQl_SDGS1Sxkb46EnEKQiV5vI&type=video&part=snippet&maxResults=15&q=${document.querySelector("#search-query").value}`)
        .then(searchResults => searchResults.json())
        .then(searchResults => {
            let ids = []
            for (let video of searchResults.items) {
                ids.push(video.id.videoId);
            }
            fetch(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyB0Yem1_WTQl_SDGS1Sxkb46EnEKQiV5vI&id=${ids.join(',')}&part=snippet,statistics`)
                .then(videoDetails => videoDetails.json())
                .then(videoDetails => {
                    for (let i in searchResults.items)
                        videoDetails.items[i].snippet.shortDesc = searchResults.items[i].snippet.description;
                    getVid(videoDetails.items)
                });
        });
//     fetch("./search.json")
//         .then(searchResults => searchResults.json())
//         .then(searchResults => {
//             let ids = []
//             for (let video of searchResults.items) {
//                 ids.push(video.id.videoId);
//             }
//             fetch("./searchvide.json")
//                 .then(videoDetails => videoDetails.json())
//                 .then(videoDetails => {
//                     for (let i in searchResults.items)
//                         videoDetails.items[i].snippet.shortDesc = searchResults.items[i].snippet.description;
//                     getVid(videoDetails.items)
//                 });
//         });
 });






function getVid(videoDetails) {
    let i = 1
    for (let video of videoDetails) {
        fillDetails(video, i++);
    }
    hideAll();
    displayVideos(1)
}

window.onresize = function () {
    // console.log(document.querySelectorAll(".active")[0].getAttribute("id"));
    displayVideos(document.querySelectorAll(".active")[0].getAttribute("id").substring(4));
}

function fillDetails(details, i) {
    // console.log(details);
    let video = document.importNode(template, true);
    video.querySelector(".ytVideo").setAttribute("id", "video" + i);
    video.querySelector(".title").textContent = details.snippet.title;
    video.querySelector(".views").textContent = details.statistics.viewCount + " views";
    video.querySelector(".published").textContent = details.snippet.publishedAt.substring(0, 10).split("-").join("/");
    video.querySelector(".author").textContent = details.snippet.channelTitle;
    video.querySelector(".author").setAttribute("onclick", "window.open('https://www.youtube.com/channel/" + details.snippet.channelId + "')");
    video.querySelector(".description").textContent = details.snippet.shortdescription;


    // video.querySelector(".vid").setAttribute("src", "https://www.youtube.com/embed/" + details.id);
    video.querySelector(".thumbnail").src = details.snippet.thumbnails.high.url;
    video.querySelector(".thumbnail").setAttribute("onclick", "window.open('https://www.youtube.com/watch?v=" + details.id + "')");

    // video.querySelector("#video" + i).setAttribute("onclick", "window.open('https://www.youtube.com/watch?v=" + details.id + "')");

    document.querySelector(".main").appendChild(video);
}


function hideAll() {
    for (let i = 1; i <= 15; i++) {
        document.querySelector("#video" + i).style.display = "none";
    }
}



function generatePages(count) {
    let pages = document.querySelector(".pages");
    pages.textContent = "";
    for (let i = 1; i <= count; i++) {
        let page = document.createElement("div");
        page.setAttribute("class", "page");
        let btn = document.createElement("button");
        btn.setAttribute("id", "page" + i);
        let pageId = i;
        btn.setAttribute("pageId", pageId)
        btn.setAttribute("onclick", "displayVideos(" + pageId + ")");
        btn.textContent = i;
        page.appendChild(btn);
        pages.appendChild(page);
    }
}


function displayVideos(pageId) {
    hideAll();
    let vidCount = videoCount()
    while (Math.ceil(15 / vidCount) < pageId) {
        pageId--;
    }

    for (let i = (vidCount * (pageId - 1)) + 1; i <= (pageId * vidCount) && i <= 15; i++) {
        document.querySelector("#video" + i).style.display = "block";
    }

    generatePages(Math.ceil(15 / vidCount));
    document.querySelector("#page" + pageId).classList.add("active");

}

function videoCount() {
    let divWidth = document.querySelectorAll(".main")[0].offsetWidth;
    let videoCount;
    if (divWidth < 500) {
        videoCount = 1;
    } else if (divWidth < 900) {
        videoCount = 2;
    } else if (divWidth < 1200) {
        videoCount = 3;
    } else if (divWidth < 1500) {
        videoCount = 4;
    } else {
        videoCount = 5;
    }

    document.querySelectorAll(".main")[0].style.setProperty('grid-template-columns', 'repeat(' + videoCount + ', 1fr)')
    return videoCount;
}