<template>

    <body>
        <!-- 不用了 -->
        <!-- <header>
            HEADER
        </header> -->
        <div class="main">
            <!-- <aside class="left">
                LEFT
            </aside> -->
            <main>
                MAIN CONTENT
                
                <div id="carouselExample" class="carousel slide" data-bs-ride="carousel" data-bs-wrap="true" data-bs-interval="1800">
                    <div class="carousel-inner">
                        <div class="carousel-item active" data-bs-interval="10000">
                        <img src="@/assets/images/home1.jpg" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item" data-bs-interval="2000">
                        <img src="@/assets/images/home2.jpg" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item">
                        <img src="@/assets/images/home3.jpg" class="d-block w-100" alt="...">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="false"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="false"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

            </main>
            <aside class="right">
                RIGHT
            </aside>
        </div>
    </body>
    <footer>
        https://www.youtube.com/watch?v=oeOQQT7Xn7w
        footer
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum iusto cumque recusandae, perferendis asperiores
        esse obcaecati? Nisi a eveniet temporibus. Delectus est provident inventore ex velit. Unde corporis quos iste.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, doloremque praesentium quis numquam nisi
        enim expedita explicabo error voluptatum, vel molestiae amet accusantium voluptate accusamus libero hic veniam
        deleniti. Voluptates!
        footer
        footer
    </footer>
</template>
<script setup>

</script>
<style scoped>
* {
    margin: 1px;
    box-sizing: border-box;
}

body {
    height: 95vh;
    background: #34e7e4;
    font-family: sans-serif;
    text-align: center;
    color: black;
    font-size: 16px;
    display: flex;
    flex-direction: column;
}

header {
    background: yellow;
    padding: 2em 0 2em 0;
}

.left {
    background: gainsboro;
    padding: 3em 0 3em 0;
    flex: 2 2 100px
}

main {
    background: white;
    padding: 3em 0 3em 0;
    flex: 8 8 150px
}

.main {
    display: flex;
    flex: 1
}

.right {
    background: gainsboro;
    padding: 3em 0 3em 0;
    flex: 2 2 100px
}

footer {
    background: burlywood;
}

@media all and (max-width: 550px) {
    .main {
        flex-direction: column;
    }

    main {
        padding: 5em 0 5em 0;
    }
}
img{
    background-color: blue;
    display: inline;
    min-height: 100vh;
}
</style>