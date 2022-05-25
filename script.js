let template = document.querySelector('#eachVideo').content;

const maximum_videos = 15
const ZERO = 0;
const ONE = 1;
const TWO = 2;
const THREE = 3;
const FOUR = 4;
const FIVE = 5;
const TEN = 10;

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
                    getVideo(videoDetails.items);
                    display_videos_and_pagenumbers(ONE);
                });
        });
});


function getVideo(videoDetails) {
    let videoCounter = ONE;
    for (let details of videoDetails) {
        let video = document.importNode(template, true);
        video.querySelector(".ytVideo").setAttribute("id", "video" + (videoCounter++));
        video.querySelector(".title").textContent = details.snippet.title;
        video.querySelector(".views").textContent = details.statistics.viewCount + " views";
        video.querySelector(".published").textContent = details.snippet.publishedAt.substring(ZERO, TEN).split("-").join("/");
        video.querySelector(".author").textContent = details.snippet.channelTitle;
        video.querySelector(".author").setAttribute("onclick", "window.open('https://www.youtube.com/channel/" + details.snippet.channelId + "')");
        video.querySelector(".desc").textContent = details.snippet.shortDesc;
        
        video.querySelector(".thumbnail").src = details.snippet.thumbnails.high.url;
        video.querySelector(".thumbnail").setAttribute("onclick", "window.open('https://www.youtube.com/watch?v=" + details.id + "')");
        document.querySelector(".main").appendChild(video);
    }
}

window.onresize = function () {
    display_videos_and_pagenumbers(document.querySelectorAll(".active")[ZERO].getAttribute("id").substring(FOUR));
}

function display_videos_and_pagenumbers(pageId) {

    for (let videoid = ONE; videoid <= maximum_videos; videoid++) {
        document.querySelector("#video" + videoid).style.display = "none";
    }

    let videocount = videoCount();
    while (Math.ceil(maximum_videos / videocount) < pageId) {
        pageId--;
    }

    for (let count = (videocount * (pageId - ONE)) + ONE; count <= (pageId * videocount) && count <= maximum_videos; count++) {
        document.querySelector("#video" + count).style.display = "block";
    }

    count = Math.ceil(maximum_videos / videocount)
    let pages = document.querySelector(".pages");
    pages.textContent = "";
    for (let pagenumber = ONE; pagenumber <= count; pagenumber++) {
        let page = document.createElement("div");
        page.setAttribute("class", "page");
        let btn = document.createElement("button");
        btn.setAttribute("id", "page" + pagenumber);
        let pageId = pagenumber;
        btn.setAttribute("pageId", pageId)
        btn.setAttribute("onclick", "display_videos_and_pagenumbers(" + pageId + ")");
        btn.textContent = pagenumber;
        page.appendChild(btn);
        pages.appendChild(page);
    }
    document.querySelector("#page" + pageId).classList.add("active");
}

function videoCount() {
    let divWidth = document.querySelectorAll(".main")[ZERO].offsetWidth;
    let videoCount;
    if (divWidth < 500) {
        videoCount = ONE;
    } else if (divWidth < 900) {
        videoCount = TWO;
    } else if (divWidth < 1200) {
        videoCount = THREE;
    } else if (divWidth < 1500) {
        videoCount = FOUR;
    } else {
        videoCount = FIVE;
    }

    document.querySelectorAll(".main")[ZERO].style.setProperty('grid-template-columns', 'repeat(' + videoCount + ', 1fr)');
    return videoCount;
}

// export const videoCount = videoCount;
