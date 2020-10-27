<template>
    <div id="intro">
        <div id="intro-text">
            <h1
                class="hide"
                v-for="(text, index) in quotes[num].texts"
                :key="index"
            >
                <span class="text">{{ text }}</span>
            </h1>
            <h1 class="hide">
                <span class="text">~ {{ quotes[num].name }} ~</span>
            </h1>
        </div>
        <div id="slider"></div>
    </div>
</template>

<script>
import { gsap } from "gsap";
export default {
    created() {
        const rand = Math.floor(Math.random() * this.quotes.length);

        this.num = rand;
    },
    mounted() {
        const t1 = gsap.timeline({ defaults: { ease: "power1.out" } });
        t1.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
        t1.to("#slider", { y: "-100%", duration: 3, delay: 2 });
        t1.to("#intro", { y: "-100%", duration: 0.6 }, "-=2.4");
        t1.fromTo("#intro", { opacity: 1 }, { opacity: 0, duration: 0.1 });
    },
    data() {
        return {
            num: null,
            quotes: [
                {
                    name: "Obama",
                    texts: [
                        "No challenge poses",
                        "a greater threat",
                        "to future generations",
                        "than climate change.",
                    ],
                },
                {
                    name: "Greta Thunberg",
                    texts: [
                        "The climate crisis",
                        "has already been solved.",
                        "We already have the facts and solutions.",
                        "All we have to do is wake up and change.",
                    ],
                },
                {
                    name: "Pope Francis",
                    texts: [
                        "God gave us the earth",
                        "to till and to keep in",
                        "a balanced and respectful way.",
                    ],
                },
                {
                    name: "Guy McPherson",
                    texts: [
                        "If you really think that the",
                        "environment is less important than the economy,",
                        "try holding your breath while you",
                        "count your money.",
                    ],
                },
                {
                    name: "Elon Musk",
                    texts: [
                        "We are running the most",
                        "dangerous experiment in history right now,",
                        "Which is to see how much carbon dioxide",
                        "the atmosphere can handle before there is an",
                        "environmental catastrophe",
                    ],
                },
            ],
        };
    },
};
</script>
<style lang="scss">
#intro {
    background: black;
    position: fixed;
    top: 0;
    left: 0;
    color: white;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    #intro-text {
        color: rgb(233, 233, 233);
        .hide {
            background: black;
            font-size: 3rem;
            overflow: hidden;
            span {
                transform: translateY(100%);
                display: inline-block;
            }
            #quote-name {
                font-size: 2rem;
            }
        }
    }
}

#slider {
    background: rgb(97, 105, 109);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translateY(100%);
}

@media only screen and (max-width: 426px) {
    #intro #intro-text .hide {
        font-size: 1.8rem;
        padding: 0px 1%;
    }
}

@media only screen and (max-width: 321px) {
    #intro #intro-text .hide {
        padding: 0px 4%;
    }
}
</style>
