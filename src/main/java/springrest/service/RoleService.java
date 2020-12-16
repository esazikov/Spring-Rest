package springrest.service;

import springrest.model.Role;

import java.util.List;

public interface RoleService {
    void add(Role role);
    Role getRoleById(Long id);
    Role getRoleByName(String roleName);
    List<Role> getAllRoles();
}
