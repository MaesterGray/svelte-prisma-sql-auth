<script lang="ts">
    let {data} = $props()
</script>

<div class=" w-screen h-screen flex flex-col items-center justify-center space-y-2">
    <div>This is{data!.user!.id}'s account and their email is {data!.user!.email}</div>
    <form action="?/signOut" method='POST'>
        <button type="submit" class=" bg-red-600 hover:bg-red-500 p-2 rounded-md text-white">Sign Out</button>
    </form>
</div>