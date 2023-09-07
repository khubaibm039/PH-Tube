const allTheBtn = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json()
    // const catches = await data.catch
    // console.log(catches)
    const buttonData = data.data
    button(buttonData)
}

const button = (buttons) => {
    // console.log(buttons)
    const btnContainer = document.getElementById('btn-container')

    for (const button of buttons) {
        // console.log(button)
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
            <button onclick="handleLoadVideos('${button.category_id}')" class="btn btn-active text-center">${button.category}</button>
        `
        btnContainer.appendChild(btnDiv)
    }
}

const handleLoadVideos = async (id) => {
    // console.log(id)
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json()
    const videos = data.data

    // console.log(videos)
    cardContainer(videos)
}

const cardContainer = (data) => {
    // console.log(data)
    const cardContainer = document.getElementById('card-container')
    const drawingContainer = document.getElementById('drawing-container')
    cardContainer.innerHTML = ""
    if (data.length < 1) {
        // console.log('ant')

        drawingContainer.classList.remove('hidden')

    }
    else {
        drawingContainer.classList.add('hidden')
    }


    data.forEach((videos) => {
        // console.log(videos)
        const cardDiv = document.createElement('div')
        cardDiv.className = `card  bg-base-100 shadow-xl p-2`
        cardDiv.innerHTML = `
        <figure class ="relative" >
        <img src="${videos.thumbnail}"
            alt="" class="rounded-xl w-full h-[200px] object-cover object-center mb-5" />
            
           <span id="time-minute" class = "absolute right-0 bottom-5 bg-black p-1 text-white"></span>
         </figure >
         
         <div class="hero  justify-start">
             <div class="flex flex-row gap-3">
                <figure class="w-10 h-10  rounded-full">
                     <img src="${videos.authors[0].profile_picture}"
                         class="w-full h-10 rounded-full object-cover object-center" />
                </figure>
            <div>
                <h1 class="font-bold">${videos.title}</h1>
                <p class="flex"> ${videos.authors[0].profile_name}
                        <span class = "ml-4"> <img id="verified-img"" class="w-5 h-5" src="./img/correct.png"></span>
                </p >
    <p>${videos.others.views}</p>

            </div >
        </div >
    </div >

    `



        cardContainer.appendChild(cardDiv);

        const verified = videos.authors[0].verified
        // console.log(verified);
        const verifiedImg = cardDiv.querySelector('#verified-img')
        console.log(verifiedImg);

        if (!verified) {
            verifiedImg.className = 'hidden';

        }
        else {
            // verifiedImg.classList.add('hidden');
        }

        // Calculate and display the time in hours and minutes ago
        const postedDateInSeconds = videos.others.posted_date;
        const hoursAgo = Math.floor(postedDateInSeconds / 3600);
        const minutesAgo = Math.floor((postedDateInSeconds % 3600) / 60);

        const timeMinute = cardDiv.querySelector('#time-minute');


        if (hoursAgo > 0 || minutesAgo > 0) {
            timeMinute.innerText = `${hoursAgo} hrs ${minutesAgo} min ago`;
        } else {

            timeMinute.style.display = 'none';
        }

    })

}


allTheBtn()
handleLoadVideos(1000)



