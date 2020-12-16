package springrest.dao;


import org.springframework.stereotype.Repository;
import springrest.model.User;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class UserDaoImp implements UserDao {

   @PersistenceContext
   private EntityManager entityManager;

   @Override
   public void add(User user) {
      entityManager.persist(user);
   }

   @Override
   public void deleteUserById(Long id) {
      entityManager.remove(getUserById(id));
   }

   @Override
   public void edit(User user) {
      entityManager.merge(user);
   }

   @Override
   public List<User> getAllUsers() {
      return entityManager.createQuery("from User",User.class).getResultList();
   }

   @Override
   public User getUserById(Long id) {
      return entityManager.find(User.class, id);
   }

   @Override
   public User getUserByUsername(String username) {
      try {return entityManager.createQuery(
              "select u from User u where u.username = :name", User.class)
              .setParameter("name", username)
              .getSingleResult();
      } catch (NoResultException e) {
       return null;
      }
   }

}
