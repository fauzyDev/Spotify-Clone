import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const scopes = [
      "user-read-email",
      "playlist-read-private",
      "playlist-read-collaborative",
      "user-read-currently-playing",
      "user-modify-playback-state",
    ].join(",");

const params = {
      scope: scopes,
    };

const LOGIN_URL = 'https://accounts.spotify.com/authorize?' + new URLSearchParams(params).toString()

async function refreshToken(token) {
      const params = new URLSearchParams()  
      params.append("grant_type", "refresh_token")
      params.append("refresh_token", token.refreshToken)

      const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':'
            + process.env.SPOTIFY_SECRET_ID).toString('base64')),
          },
        body: params
      }) 
      const data = await response.json();
      console.log(data)

      return {
        ...token,
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + data.expires_in * 1000
    };
  };

export const authOptions = {
    providers: [
      SpotifyProvider({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_SECRET_ID,
        authorization: LOGIN_URL,
      }),
    ],
  secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, account, profile }) {
        if (account && profile) {
          token.accessToken = account.access_token;
          token.accessTokenExpires = Date.now() + account.expires_in * 1000;
          token.refreshToken = account.refresh_token;
          token.user = {
              name: profile.display_name,
              email: profile.email,
              image: profile.images?.[0]?.url
          }
          return token;
        }

        if (Date.now() < token.accessTokenExpires * 1000) {
          return token;
        }

        return await refreshToken(token)
      },

    async session({ session, token }) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
        return session
      }
    }
  };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 