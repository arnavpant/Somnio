export async function apiClient(url, method = "GET", body = null) {
    let accessToken = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");
  
    const headers = { "Content-Type": "application/json" };
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
  
    let response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });
  
    // If the access token is expired, the server may return 401.
    if (response.status === 401 && refreshToken) {
      // Try refreshing the access token.
      const refreshRes = await fetch(
        "https://supreme-guacamole-rwxpjgpqx6xhxvv5-8000.app.github.dev/api/token/refresh/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );
      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        localStorage.setItem("access", refreshData.access);
        accessToken = refreshData.access;
        headers["Authorization"] = `Bearer ${accessToken}`;
        // Retry the original request with the new access token.
        response = await fetch(url, {
          method,
          headers,
          body: body ? JSON.stringify(body) : null,
        });
      } else {
        // Refresh token invalid; clear stored tokens and optionally redirect to login.
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        // Optionally, redirect to login:
        // window.location.href = "/login";
      }
    }
    return response;
  }
  