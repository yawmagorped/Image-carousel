import "./style.css";

let b = require.context('./images/', true, /\.(jpg|jpeg)$/);
let imageSources = b.keys().map(b);

let emptyDot = require('./images/dot-svgrepo-com.svg');
let filledDot = require('./images/dot-fill-svgrepo-com.svg');
const handleCarousel = () => {
    const container = document.querySelector(".container");
    const prevImg = container.querySelector("#previous-img > img");
    const currImg = container.querySelector("#current-img > img");
    const nextImg = container.querySelector("#next-img > img");
    
    let currIndex = 0;

    const createImageDots = (i) => {
        let img = document.createElement("img");
        img.src = emptyDot;
        img.id = `dot${i}`;
        return img;
    }

    const dotsContainer = document.querySelector(".dots");

    for (let index = 0; index < imageSources.length; index++) {
        let dot = createImageDots(index);
        dotsContainer.append(dot);
        dot.addEventListener('click', (e) => {
            currIndex = index;
            emptyDots();
            setCarouselFocus(index);
        })
    }
    
    const leftArrow = document.querySelector("#left-arrow");
    const rightArrow = document.querySelector("#right-arrow");
    
    
    
    const emptyDots = () => {
        let images = document.querySelectorAll(".dots img");
        images.forEach(image => {
            image.src = emptyDot;
        });
    }

    const setImageSources = (prev, curr, next) => {
        prevImg.src = prev;
        currImg.src = curr;
        nextImg.src = next;
    } 
    
    const setCarouselFocus = (i) => {
        if (i == 0)
            setImageSources(imageSources[imageSources.length - 1], imageSources[i], imageSources[i+1]);
        else if (i == (imageSources.length - 1)) 
            setImageSources(imageSources[i - 1], imageSources [i], imageSources[0]);
        else
            setImageSources(imageSources[i-1], imageSources[i], imageSources[i+1]);
        let dot = document.querySelector(`#dot${i}`)
        dot.src = filledDot;
    }

    const rotateCarousel = (dirString) => {
        emptyDots();
        if (dirString == "left") {
            if(currIndex == 0)
                currIndex = imageSources.length - 1;
            else
                currIndex--;
            
            setCarouselFocus(currIndex);
        } else if (dirString == "right") {
            if(currIndex == imageSources.length - 1)
                currIndex = 0;
            else
                currIndex++;
            
            setCarouselFocus(currIndex)
        }
    }

    leftArrow.addEventListener('click', () => rotateCarousel("left"));
    rightArrow.addEventListener('click', () => rotateCarousel("right"));
    
    
    setCarouselFocus(currIndex);

    //let timer = setInterval(autoProgress, 5000);

    //const stopTimer = () => {};

    //const autoProgress = () => {};
};

handleCarousel();