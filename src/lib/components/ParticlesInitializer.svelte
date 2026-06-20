<!--<script lang="ts">-->
<!--    import Particles from "@tsparticles/svelte";-->
<!--    import {loadMeteorsPreset} from "@tsparticles/preset-meteors";-->
<!--    import type {Engine, ISourceOptions} from "@tsparticles/engine";-->
<!--  -->
<!--    const handleInit = async (event: CustomEvent<Engine>) => {-->
<!--        await loadMeteorsPreset(event.detail);-->
<!--    };-->

<!--    const options: ISourceOptions = {-->
<!--        preset: "meteors",-->
<!--        background: {-->
<!--            color: "#1a1a2e",-->
<!--        },-->
<!--    };-->
<!--</script>-->

<!--<Particles-->
<!--        id="meteors"-->
<!--        {options}-->
<!--        on:init={handleInit}-->
<!--/>-->

<script lang="ts">
    import Particles, {initParticlesEngine} from "@tsparticles/svelte";
    import {loadMeteorsPreset} from "@tsparticles/preset-meteors";
    import type {ISourceOptions, Engine} from "@tsparticles/engine";

    initParticlesEngine(async (engine: Engine) => {
        await loadMeteorsPreset(engine);
    });

    const options: ISourceOptions = {
        preset: "meteors",
        background: {
            opacity: 0.1
        },
        particles: {
            opacity: {
                value: {
                    min: 0.2,
                    max: 0.5,
                },
            }
        }
    };

</script>

<Particles id="meteors" {options}/>
