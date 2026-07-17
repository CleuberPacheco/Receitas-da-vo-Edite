package br.com.pacheco.caderno_receitas.service;

import com.oracle.bmc.ConfigFileReader;
import com.oracle.bmc.auth.AuthenticationDetailsProvider;
import com.oracle.bmc.auth.ConfigFileAuthenticationDetailsProvider;
import com.oracle.bmc.objectstorage.ObjectStorageClient;
import com.oracle.bmc.objectstorage.requests.PutObjectRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStream;

@Service
public class ObjectStorageService {

    public String uploadFile(MultipartFile file) throws Exception {
        // 1. Carrega a configuração (busca o arquivo em ~/.oci/config automaticamente)
        final ConfigFileReader.ConfigFile configFile = ConfigFileReader.parseDefault();
        final AuthenticationDetailsProvider provider = new ConfigFileAuthenticationDetailsProvider(configFile);

        // 2. Cria o cliente do Object Storage
        try (ObjectStorageClient client = ObjectStorageClient.builder().build(provider)) {

            // 3. Prepara o envio do arquivo
            InputStream inputStream = file.getInputStream();

            // Substitua SEU_NAMESPACE_AQUI pelo valor real encontrado no seu painel da Oracle
            String namespace = "graoqb3rah6k";
            String bucketName = "receitas-fotos";
            String objectName = System.currentTimeMillis() + "_" + file.getOriginalFilename(); // Adiciona timestamp para evitar nomes duplicados

            PutObjectRequest request = PutObjectRequest.builder()
                    .bucketName(bucketName)
                    .namespaceName(namespace)
                    .objectName(objectName)
                    .putObjectBody(inputStream)
                    .build();

            client.putObject(request);

            // 4. Retorna a URL pública da imagem
            return "https://objectstorage.sa-saopaulo-1.oraclecloud.com/n/" + namespace + "/b/" + bucketName + "/o/" + objectName;
        }
    }
}