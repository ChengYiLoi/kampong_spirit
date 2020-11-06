<template>
   <b-card :title="eventInfo.title">
       <ul>
           <li>Date</li>
           <li>Time</li>
           <li>Location</li>
       </ul>
   </b-card>
</template>
<script>
export default {
    props: ['eventInfo'],
    data(){
        return{

        }
    }
}
</script>
<style lang="scss">
    
</style>