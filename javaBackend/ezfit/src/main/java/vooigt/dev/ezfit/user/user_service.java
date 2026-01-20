package vooigt.dev.ezfit.user;

import java.sql.*;
import javax.sql.DataSource;

import org.springframework.stereotype.Service;

@Service
public class user_service {

    private final DataSource dataSource;

    public user_service(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public user_model get_user(String email) throws SQLException {
        String sql = "SELECT email, contrasenya FROM usuario WHERE email = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, email);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new user_model(
                        rs.getString("email"),
                        rs.getString("contrasenya")
                    );
                } else {
                    return null;
                }
            }
        }
    }
}