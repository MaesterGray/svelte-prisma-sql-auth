<script lang="ts">
    let email = $state('');
    let password = $state('');
    let {form,data} = $props()

  if (form) {
    if (form.message==='failed') {
        switch (form.reason) {
          case 'password or email incorrect':
            alert('Password or email incorrect')
            break;
            case 'user does not exist':
              alert('The user does not exist')
            break;
          default:
            break;
        }
    }
  }
    
    
  </script>
  
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">Sign in to your account</h2>
      </div>
      <form class="mt-8 space-y-6" action="?/login" method="post" >
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              bind:value={email}
              required
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              bind:value={password}
              required
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>
  
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </div>
      </form>
      <div class="text-sm text-center">
        <a href="/signup" class="font-medium text-indigo-600 hover:text-indigo-500">
          Don't have an account? Sign up
        </a>
      </div>
    </div>
  </div>