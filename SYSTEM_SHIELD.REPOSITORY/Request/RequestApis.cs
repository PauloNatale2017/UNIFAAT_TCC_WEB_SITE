using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SYSTEM_SHIELD.REPOSITORY.Request
{
   public class RequestApis
    {
        public async Task RequestApiUsers()
        {
            try
            {
                

                var client = new RestClient("https://localhost:5000/api/external/externalusersall");
                var RSrequest = new RestRequest(Method.GET) { RequestFormat = DataFormat.Json };
                var retornos = client.Execute(RSrequest);

                var client1 = new RestClient("https://localhost:5001/api/external/externalusersall");
                var RSrequest1 = new RestRequest(Method.GET) { RequestFormat = DataFormat.Json };
                var retornos1 = client1.Execute(RSrequest);

                var client2 = new RestClient("http://localhost:58886/api/external/externalusersall");
                var RSrequest2 = new RestRequest(Method.GET) { RequestFormat = DataFormat.Json };
                var retornos2 = client2.Execute(RSrequest);

                var client3 = new RestClient("https://localhost:46666/api/external/externalusersall");
                var RSrequest3 = new RestRequest(Method.GET) { RequestFormat = DataFormat.Json };
                var retornos3 = client3.Execute(RSrequest);

            }
            catch (Exception ex)
            {
                throw ex;
            }
           
        }
    }
}
