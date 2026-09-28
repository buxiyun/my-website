import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not signed in and route is /internal (but not /internal/login), redirect to login
  if (!user && request.nextUrl.pathname.startsWith("/internal") && !request.nextUrl.pathname.startsWith("/internal/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/internal/login";
    return NextResponse.redirect(url);
  }

  // If user is signed in and on login page, redirect to /internal
  if (user && request.nextUrl.pathname === "/internal/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/internal";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
