package springrest.handlers;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.StringJoiner;

@Component
public class CurrentUserInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            StringJoiner roles = new StringJoiner("|");
            authentication.getAuthorities().forEach(authority -> roles.add(authority.getAuthority()));
            Cookie cookieRoles = new Cookie("roles", roles.toString());
            Cookie cookieUsername = new Cookie("username", authentication.getName());
            response.addCookie(cookieRoles);
            response.addCookie(cookieUsername);
        }
    }
}

