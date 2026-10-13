import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
    title: 'Login | Luminous',
}

export default function Login() {
    return (
        <div className="flex h-svh w-full items-center gap-2.5 p-2.5">
            <div className="relative h-full flex-1 rounded-[50px] overflow-hidden">
                <Image
                    src="/login2.jpg"
                    alt="login-page"
                    loading='eager'
                    fill
                    quality={95}
                    sizes='50vw'
                    className="select-none object-center object-cover"
                />
            </div>


            <div className="flex h-full flex-1 items-center justify-center">
        <div className="w-full max-w-sm px-4">
          <h1 className="text-3xl font-bold text-center select-none">Welcome back</h1>
          <p className="mb-8 mt-1 font-medium text-center opacity-40 select-none">
            Sign in to Luminous
          </p>

          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="rounded-xl border-2 border-(--background-sec) placeholder:opacity-70 px-3 py-2.5 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="rounded-xl border-2 border-(--background-sec) placeholder:opacity-70 px-3 py-2.5 outline-none"
              />
            </div>
            
            <Link
              href="/dashboard"
              className="rounded-xl bg-foreground py-3.5 text-center font-medium text-background hover:bg-(--background-sec) hover:text-foreground duration-300 ease-out transition-all"
            >
              Sign in
            </Link>
          </form>
        </div>
      </div>
        </div>
    )
}
