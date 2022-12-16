<template>
    <div class="d-flex flex-column flex-shrink-0 bg-light" style="width: 4.5rem; height: 100vh; padding: -5px; position: fixed; overflow: auto;">
        <a href="/" class="d-block p-3 link-dark text-decoration-none" title="Icon-only" data-bs-toggle="tooltip"
            data-bs-placement="right">
            <svg class="bi bi-0-circle" width="40" height="32">
                <use xlink:href="#bootstrap" />
            </svg>
            <span class="visually-hidden">Icon-only</span>
        </a>
        <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
            <li class="nav-item">
                <router-link active-class="active" class="nav-link py-3 border-bottom rounded-0" aria-current="page"
                    title="Home" data-bs-toggle="tooltip" data-bs-placement="right" to="/home" exact>
                    <i class="bi bi-grid-1x2-fill" style="font-size: 24px;"></i></router-link>
            </li>
            <li class="nav-item">
                <router-link active-class="active" class="nav-link py-3 border-bottom rounded-0" aria-current="page"
                    data-toggle="tooltip" data-placement="top" title="Tooltip on top" to="/uno">
                    <i class="bi bi-house" style="font-size: 24px;"></i></router-link>
            </li>
            <li>
                <a href="#" class="nav-link py-3 border-bottom rounded-0" title="Orders" data-bs-toggle="tooltip"
                    data-bs-placement="right">
                    <svg class="bi pe-none" width="24" height="24" role="img" aria-label="Orders">
                        <use xlink:href="#table" />
                    </svg>
                </a>
            </li>
            <li>
                <a href="#" class="nav-link py-3 border-bottom rounded-0" title="Products" data-bs-toggle="tooltip"
                    data-bs-placement="right">
                    <svg class="bi pe-none" width="24" height="24" role="img" aria-label="Products">
                        <use xlink:href="#grid" />
                    </svg>
                </a>
            </li>
            <li>
                <a href="#" class="nav-link py-3 border-bottom rounded-0" title="Customers" data-bs-toggle="tooltip"
                    data-bs-placement="right">
                    <svg class="bi pe-none" width="24" height="24" role="img" aria-label="Customers">
                        <use xlink:href="#people-circle" />
                    </svg>
                </a>
            </li>
        </ul>
        <div class="dropdown border-top">
            <a href="#"
                class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" class="rounded-circle">
            </a>
            <ul class="dropdown-menu text-small shadow">
                <li><a class="dropdown-item" href="#">New project...</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="#">Sign out</a></li>
            </ul>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>