<script lang="ts">
import { h, defineComponent } from 'vue';

const hClassList = {
   1: 'text-4xl',
   2: 'text-3xl',
   3: 'text-2xl',
   4: 'text-xl',
   5: 'text-lg',
   6: 'text-base',
};

export default defineComponent({
   render() {
      const classList = [
         hClassList[this.level as keyof typeof hClassList],
         'font-bold',
      ];

      return h(`h${this.level}`, { classList }, this.$slots.default!());
   },

   props: {
      level: {
         type: Number,
         required: true
      },
   },
});
</script>