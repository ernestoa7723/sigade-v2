import {Component} from "react";

import '../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

class CarouselInner extends Component {
    render() {
        if (this.props.orientation === 'landscape') {
            return (
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="mx-auto text-center">
                            <img src="/img/2023_01_09_19_33_IMG_4667---540x319.jpg"
                                 alt=""
                                 srcSet="/img/2023_01_09_19_33_IMG_4667---540x319.jpg 540w,
                                             /img/2023_01_09_19_33_IMG_4667---960x712.jpg 960w,
                                             /img/2023_01_09_19_33_IMG_4667---1000x750.jpg 1000w"
                            />
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="mx-auto text-center">
                            <img src="/img/285624889_5495619160471534_3400848269272133891_n---540x319.jpg"
                                 alt=""
                                 srcSet="/img/285624889_5495619160471534_3400848269272133891_n---540x319.jpg 540w,
                                             /img/285624889_5495619160471534_3400848269272133891_n---960x660.jpg 960w"
                            />
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="mx-auto text-center">
                            <img src="/img/286455813_5509412365758880_6885889679718344862_n---540x319.jpg"
                                 alt=""
                                 srcSet="/img/286455813_5509412365758880_6885889679718344862_n---540x319.jpg 540w,
                                         /img/286455813_5509412365758880_6885889679718344862_n---960x712.jpg 960w,
                                         /img/286455813_5509412365758880_6885889679718344862_n---1140x561.jpg 1140w,
                                         /img/286455813_5509412365758880_6885889679718344862_n---2048x1536.jpg 2048w"
                            />
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="mx-auto text-center">
                            <img src="/img/2023_01_09_19_33_IMG_4667---375x611.jpg"
                                 alt=""
                                 srcSet="/img/2023_01_09_19_33_IMG_4667---375x611.jpg 375w,
                                         /img/2023_01_09_19_33_IMG_4667---720x946.jpg 720w"
                            />
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="mx-auto text-center">
                            <img src="/img/285624889_5495619160471534_3400848269272133891_n---375x611.jpg"
                                 alt=""
                                 srcSet="/img/285624889_5495619160471534_3400848269272133891_n---375x611.jpg 375w,
                                         /img/285624889_5495619160471534_3400848269272133891_n---720x946.jpg 720w"
                            />
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="mx-auto text-center">
                            <img src="/img/286455813_5509412365758880_6885889679718344862_n---375x611.jpg"
                                 alt=""
                                 srcSet="/img/286455813_5509412365758880_6885889679718344862_n---375x611.jpg 375w,
                                         /img/286455813_5509412365758880_6885889679718344862_n---720x946.jpg 720w"
                            />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

class Main extends Component {
    change_size = () => {
        try {
            let header = document.getElementsByTagName('header')
            let container = document.getElementsByClassName('container').item(1)

            let avail_width = window.innerWidth - (window.innerWidth - container.offsetWidth)
            let avail_height = window.innerHeight - header.item(0).offsetHeight

            let orientation = window.screen.orientation.type.split('-')[0]

            let images = container.getElementsByTagName('img')

            for (let i = 0; i < images.length; i++) {
                if (orientation === 'landscape') {
                    images[i].setAttribute('height', avail_height)
                }
                if (orientation === 'portrait') {
                    images[i].setAttribute('width', avail_width)
                }
            }
        } catch (e) {

        }
    }

    componentDidMount() {
        this.change_size()
    }

    render() {
        let carousel_inner = <CarouselInner orientation={window.screen.orientation.type.split('-')[0]}/>

        window.addEventListener("orientationchange", ev => {
            carousel_inner = <CarouselInner orientation={window.screen.orientation.type.split('-')[0]}/>
        })

        return (
            <main className="flex-shrink-0">
                <div className="container">
                    <div id="carousel" className="carousel slide my-carousel" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" aria-label="Slide 1" className="active" aria-current="true"></button>
                            <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
                            <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3" className=""></button>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                        { carousel_inner }
                    </div>
                </div>
            </main>
        )
    }
}

export default Main
