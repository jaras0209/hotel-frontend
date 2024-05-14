<template>
            <header class="header_area">
            <div class="container">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <a class="navbar-brand logo_h" href="index.html"><img src="/Logo.png" alt=""></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                        <ul class="nav navbar-nav menu_nav ms-auto">
                            <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li> 
                            <li class="nav-item"><a class="nav-link" href="about.html">About us</a></li>
                            <li class="nav-item"><a class="nav-link" href="accomodation.html">Accomodation</a></li>
                            <li class="nav-item"><a class="nav-link" href="gallery.html">Gallery</a></li>
                            <li class="nav-item submenu dropdown">
                                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Blog</a>
                                <ul class="dropdown-menu">
                                    <li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
                                    <li class="nav-item"><a class="nav-link" href="blog-single.html">Blog Details</a></li>
                                </ul>
                            </li> 
                            <li class="nav-item"><a class="nav-link" href="elements.html">Elemests</a></li>
                            <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
                        </ul>
                    </div> 
                </nav>
            </div>
        </header>
</template>
    
<script setup>
    
</script>
    
<style>
    .header_area{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 20;
    }
    .navbar{
    padding: 0px;
    border:0px;
    border-radius: 0px;
}

.navbar{
    background: #fff;
    padding: 0px 25px;
    .logo_h{
        padding-top: 0px;
    }
    .menu_nav{
        .nav-item{
            .nav-link{
                font: 500 12px/80px $pop;
                color: $dark;
                text-transform: uppercase;
                padding: 0px;
                &:after{
                    display: none;
                }
            }
            &:hover, &.active{
                .nav-link{
                    color: $light_blue;
                }
            }
            &.submenu{
                position: relative;
                ul{
                    border: none;
                    padding: 0px;
                    border-radius: 0px;
                    box-shadow: none;
                    margin: 0px;
                    background: transparent;
                    @media (min-width: 992px){
                        position: absolute;
                        top: 100%;
                        left: 0px;
                        min-width: 220px;
                        text-align: left;
                        opacity: 0;
                        transition: all 300ms ease-in;
                        visibility: hidden;
                        display: block;
                        border: none;
                        padding: 0px;
                        border-radius: 0px;
                    }
                    &:before{
                        content: "";
                        width: 0;
                        height: 0;
                        border-style: solid;
                        border-width: 10px 10px 0 10px;
                        border-color: #eeeeee transparent transparent transparent;
                        position: absolute;
                        right: 24px;
                        top: 45px;
                        z-index: 3;
                        opacity: 0;
                        transition: all 400ms linear;
                    }
                    .nav-item{
                        display: block;
                        float: none;
                        margin-right: 0px;
                        border-bottom: 1px solid #ededed;
                        margin-left: 0px;
                        background: #fff;
                        transition: all 0.4s linear;
						@media( min-width:992px){
							margin-top: 10px;
						}
                        .nav-link{
                            line-height: 45px;
                            color: $dark;
                            padding: 0px 30px;
                            transition: all 150ms linear;
                            display: block;
                        }
                        &:last-child{
                            border-bottom: none;
                        }
                        &:hover{
                            .nav-link{
                                background: #f0f0f0;
                                color: $light_blue;
                            }
                        }    
                    }
                }
                &:hover{
                    ul{
                        @media (min-width: 992px){
                            visibility: visible;
                            opacity: 1;
                        }
                        .nav-item{
                            margin-top: 0px;
                        }
                    }
                }
            }
            & + li{
                margin-left: 30px;
            }
        }
    }
}
</style>