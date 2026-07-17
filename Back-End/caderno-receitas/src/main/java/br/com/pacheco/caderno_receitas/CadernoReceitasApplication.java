package br.com.pacheco.caderno_receitas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.security.Security;
import oracle.security.pki.OraclePKIProvider; // Certifique-se de que a dependência oraclepki está no pom.xml

@SpringBootApplication
public class CadernoReceitasApplication {

    public static void main(String[] args) {
        // Registra o provedor da Oracle para conseguir ler o arquivo .sso
        Security.addProvider(new OraclePKIProvider());

        // Define a localização da Wallet
        System.setProperty("oracle.net.tns_admin", "C:\\wallet-edite");

        SpringApplication.run(CadernoReceitasApplication.class, args);
    }
}