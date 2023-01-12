import {Component} from "react";

import '../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

class Main extends Component {
    changeHeight = () => {
        try {
            let carousel = document.getElementById('carousel')
            let q_carousel = carousel.querySelectorAll("img")

            let header_w = document.querySelector('header').offsetWidth
            let header_h = document.querySelector('header').offsetHeight
            let avail_width = (window.innerWidth - header_w).toString() + 'px'
            let avail_height = (window.innerHeight - header_h).toString() + 'px'

            q_carousel.forEach(
                img => {
                    if (window.screen.orientation.angle === 0 || window.screen.orientation.angle === 180) {
                        img.setAttribute('height', avail_height)
                    }
                    if (window.screen.orientation.angle === 90 || window.screen.orientation.angle === 270) {
                        img.setAttribute('width', avail_width)
                    }
                }
            )
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        if (document.readyState === 'complete') {
            this.changeHeight()

            window.screen.orientation.addEventListener(
                'change', (event) => {
                    this.changeHeight()
                }
            )
        }

        return (
            <main className="flex-shrink-0">
                <div className="container">
                    <div id="carousel" className="carousel slide my-carousel" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" aria-label="Slide 1" className="active" aria-current="true"></button>
                            <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
                            <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3" className=""></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="mx-auto text-center">
                                    <img src="http://127.0.0.1:3000/imgs/2023_01_09_19_33_IMG_4667.JPG" alt="" className="img-fluid"/>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="mx-auto text-center">
                                    <img src="http://127.0.0.1:3000/imgs/285624889_5495619160471534_3400848269272133891_n.jpg" alt="" className="img-fluid"/>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="mx-auto text-center">
                                    <img src="http://127.0.0.1:3000/imgs/286455813_5509412365758880_6885889679718344862_n.jpg" alt="" className="img-fluid"/>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </main>
        )
    }
}

export default Main
