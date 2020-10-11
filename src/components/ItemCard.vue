<template>
    <b-card :title="`${item.name}`" class="card-info">
        <b-row>
            <b-col>
                <b-img fluid :src="`${imgUrl}`">
                </b-img>
            </b-col>
        </b-row>
        <b-row class="py-3 ">
            <b-col class="text-left">
                Location: {{item.location}}
            </b-col>
            <b-col class="text-right">
                State: {{item.state}}
            </b-col>
        </b-row>
        
    </b-card>
</template>
<script>
export default {
    props: ['item'],
    data(){
        return{
          
    }
    },
    computed:{
        imgUrl(){
          
           if(this.item.image == 'NA'){
               return "https://picsum.photos/id/237/800/300";
           }
           return "./uploads/" + this.item.image;
          
                
            
        }
    }
}
</script>
<style lang="scss">
    
</style>