package grok_connect.providers;

import java.sql.*;
import java.util.*;
import grok_connect.utils.*;
import grok_connect.connectors_info.*;


public class TeradataDataProvider extends JdbcDataProvider {
    public TeradataDataProvider() {
        descriptor = new DataSource();
        descriptor.type = "Teradata";
        descriptor.description = "Query Teradata database";
        descriptor.connectionTemplate = new ArrayList<>(DbCredentials.dbConnectionTemplate);
        descriptor.connectionTemplate.add(new Property(Property.BOOL_TYPE, DbCredentials.SSL));
        descriptor.credentialsTemplate = DbCredentials.dbCredentialsTemplate;
    }

    public Connection getConnection(DataConnection conn) throws ClassNotFoundException, SQLException {
        Class.forName("com.teradata.jdbc.TeraDriver");
        java.util.Properties properties = defaultConnectionProperties(conn);
        if (!conn.hasCustomConnectionString() && conn.ssl())
            properties.setProperty("ENABLESSL", "true");
        return DriverManager.getConnection(getConnectionString(conn), properties);

    }

    public String getConnectionStringImpl(DataConnection conn) {
        String port = (conn.getPort() == null) ? "" : ":" + conn.getPort();
        return "jdbc:teradata://" + conn.getServer() + port + "/" + conn.getDb();
    }
}
