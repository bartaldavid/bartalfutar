<script lang="ts">
  import { deleteDoc, doc } from "firebase/firestore";
  import { savedStops, user } from "../data/stores";
  import { db } from "../util/firebaseSetup";

  async function deleteAll() {
    if ($user?.uid) {
      try {
        // FIXME this is not working, may have to loop manually through all subdocs
        await deleteDoc(doc(db, "userdata", $user.uid));
        console.log("deletion successful");
      } catch (e) {
        console.error(e);
      }
    } else {
      $savedStops = [];
    }
  }
</script>

<button
  class="button-outline bg-white text-red-500 dark:border-none dark:bg-slate-700 dark:text-red-400"
  on:click={deleteAll}
  ><span class="material-symbols-outlined mr-1 align-bottom text-base">
    delete_forever
  </span><span> Delete all</span></button
>
