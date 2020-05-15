$(function () {

    jQuery.browser = {};
    jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());

    if ($.browser.chrome) {
        $(".geral").attr("style", "height: 1220px;");
        $(".dvSubFooter").attr("style", "height: 58px;");
    }


    if ($.browser.mozilla) {
        $(".geral").attr("style", "height: 1140px;");
    }

    $("#Cliente").html($("#PropNome", opener.document.body).val());

    var _checkauto = opener.checkautoModel;

    var _datacriacao = $("#DtaCriacao", opener.document.body).val();
    var _datafinalizacao = $("#DtaFinalizacao", opener.document.body).val();
    var _datacertificacao = $("#DtaCertificacao", opener.document.body).val();

    var _cliente = $("#PropNome", opener.document.body).val();
    var _email = $("#PropEmail", opener.document.body).val();
    var _cpf = $("#PropCPF", opener.document.body).val();
    var _telefone = $("#PropTel", opener.document.body).val();

    if ($("#VeicObsMotorBin", opener.document.body).val())
        var _observacao = $("#VeicObsMotorBin", opener.document.body).val() + '<br/>' + $("#VeicObs", opener.document.body).val();
    else
        var _observacao = $("#VeicObs", opener.document.body).val();

    $(".SHCliente").attr("style", "font-size:10px;width:200px");
    $(".SHDadosVeiculo").attr("style", "font-size:10px");
    $(".SHDadosVeiculo2").attr("style", "font-size:10px");

    var shtopo = "DATA CRIAÇÃO: " + _datacriacao + " | DATA FINALIZAÇÃO: " + _datafinalizacao;

    if (_datacertificacao != null && _datacertificacao.length > 0)
        shtopo += " | DATA CERTIFICAÇÃO: " + _datacertificacao

    $(".SHTopo").html(shtopo);

    $(".SHCliente").html(_cliente + "<br /><span class='emailsite'>" + _email + "</span><br />" + _cpf + "<br />" + _telefone);

    var _produto = $("#CodProduto", opener.document.body).val();
    var _renavamcoleta = $("#VeicRenavam", opener.document.body).val().toUpperCase();
    var _renavamcrlv = $("#Renavam", opener.document.body).val();

    if (_produto == 9 || _produto == 20) {

        var _chassi = $("#VeicNrChassi", opener.document.body).val().toUpperCase();
        var _motor = $("#VeicNrMotor", opener.document.body).val().toUpperCase();
        var _placa = $("#VeicPlaca", opener.document.body).val().toUpperCase();
        var _marca = $("#Fabricante", opener.document.body).val().toUpperCase();
        var _modelo = $("#Modelo", opener.document.body).val().toUpperCase();
        var _anoFab = $("#VeicAnoFab", opener.document.body).val().toUpperCase();
        var _anoMod = $("#VeicAnoMod", opener.document.body).val().toUpperCase();


        $(".SHDadosVeiculo").html(_chassi + "<br />" + _motor + "<br />" + _placa + "<br />" + _marca + "<br />" + _modelo);
        $(".SHDadosVeiculo2").html("<br /><br />" + _anoFab + "<br />" + _anoMod + "<br />");

    }

    if (_checkauto != undefined && _checkauto != null) {

        $(".SHDadosVeiculo").html(_checkauto.Chassi + "<br />" + _checkauto.Motor + "<br />" + _checkauto.Placa + "<br />" + _checkauto.Marca + "<br />" + _checkauto.Modelo);
        $(".SHDadosVeiculo2").html(_checkauto.Cor + "<br />" + _checkauto.Combustivel + "<br />" + _checkauto.AnoFabricacao + "<br />" + _checkauto.AnoModelo + "<br />" + _checkauto.Situacao);

        //IDENTIFICACAO
        //$("#chkValorDebitoLicenciamento").html(_checkauto.ValorDebitoLicenciamento == null || _checkauto.ValorDebitoLicenciamento == 0 ? "NADA CONSTA" : "<span style='color:red;font-weight:bold;'>" + _checkauto.ValorDebitoLicenciamento + "</span>");

        $("#chkTributario").html($("input[name='BaseTributaria']:checked", opener.document.body).val() == 1 ? "<span style='color:red;font-weight:bold;'>" + "CONSTA OCORRÊNCIA" + "</span>" : "NADA CONSTA");
        $("#chkVeiculoSinistrado").html($("input[name='BaseSinistrado']:checked", opener.document.body).val() == 1 ? "<span style='color:red;font-weight:bold;'>" + "CONSTA OCORRÊNCIA" + "</span>" : "NADA CONSTA");
        $("#chkEmplacamento").html(_checkauto.UFEmplacamento == null ? "NADA CONSTA" : 'UF: ' + _checkauto.UFEmplacamento);

        //LICENCIAMENTO/DPVAT
        var _chkLicenciamentoDPVAT = _checkauto.ValorDebitoLicenciamento == null || _checkauto.ValorDebitoLicenciamento == "0" ? "" : _checkauto.ValorDebitoLicenciamento + "/";
                       _chkLicenciamentoDPVAT = _chkLicenciamentoDPVAT + (_checkauto.ValorDebitoDPVAT == null || _checkauto.ValorDebitoDPVAT == "0" || _checkauto.ValorDebitoDPVAT == "3" ? "" : _checkauto.ValorDebitoDPVAT);
        $("#chkValorDebitoLicenciamento").html(_chkLicenciamentoDPVAT == "" ? "NADA CONSTA" : "<span style='color:red;font-weight:bold;'>" + _chkLicenciamentoDPVAT + "</span>");

        //MULTAS IPVA
        var _chkMultasIpva = _checkauto.ValorDebitoMultas == null ? "" : _checkauto.ValorDebitoMultas + "/";
        _chkMultasIpva = _chkMultasIpva + (_checkauto.ValorDebitoIPVA == null ? "" : _checkauto.ValorDebitoIPVA);

        $("#chkMultasIpva").html(_chkMultasIpva == "" ? "NADA CONSTA" : "<span style='color:red;font-weight:bold;'>" + _chkMultasIpva + "</span>");

        if (chkMultasIpva.innerText.toString() == "0/0" || chkMultasIpva.innerText.toString() == "0" || chkMultasIpva.innerText.toString() == "" || chkMultasIpva.innerText.toString() == "0/") {
            $("#chkMultasIpva").html("NADA CONSTA")
        }
        else {
            $("#chkMultasIpva").html("<span style='color:red;font-weight:bold;'>" + _chkMultasIpva.replace("/0", "").replace("0/", "") + "</span>")
        }

        $("#chkRestricaoAverbacao").html($("input[name='BaseAverbacao']:checked", opener.document.body).val() == 1 ? "<span style='color:red;font-weight:bold;'>" + "CONSTA OCORRÊNCIA" + "</span>" : "NADA CONSTA");
        $("#chkJudicial").html($("input[name='BaseJudicial']:checked", opener.document.body).val() == 1 ? "<span style='color:red;font-weight:bold;'>" + "CONSTA OCORRÊNCIA" + "</span>" : "NADA CONSTA");
        $("#chkComunicacaoVenda").html($("input[name='BaseComunicacao']:checked", opener.document.body).val() == 1 ? "<span style='color:red;font-weight:bold;'>" + "CONSTA OCORRÊNCIA" + "</span>" : "NADA CONSTA");

        $("#chkArrendamento").html($("input[name='RestricaoArrendamento']:checked", opener.document.body).val() == 1 ? "NADA CONSTA" : "<span style='color:red;font-weight:bold;'>" + "CONSTA OCORRÊNCIA" + "</span>");

        $("#chkRestricaoCRLV").html($("input[name='BaseCRLV']:checked", opener.document.body).val() == 1 ? "<span style='color:red;font-weight:bold;'>" + "CONSTA OCORRÊNCIA" + "</span>" : "NADA CONSTA");

        $("#chkAdministrativa").html(_checkauto.Administrativa);

        $("#chkVeiculoApreendido").html($("input[name='BaseApreendido']:checked", opener.document.body).val() == 1 ? "<span style='color:red;font-weight:bold;'>" + "CONSTA OCORRÊNCIA" + "</span>" : "NADA CONSTA");
        $("#chkRestricaoBloqueio").html($("input[name='BaseBloqueio']:checked", opener.document.body).val() == 1 ? "<span style='color:red;font-weight:bold;'>" + "CONSTA OCORRÊNCIA" + "</span>" : "NADA CONSTA");
        $("#chkDocumentoExtraviado").html($("input[name='BaseDocumentoExtraviado']:checked", opener.document.body).val() == 1 ? "<span style='color:red;font-weight:bold;'>" + "CONSTA OCORRÊNCIA" + "</span>" : "NADA CONSTA");
        $("#chkArrolamentoBens").html($("input[name='BaseArrolamento']:checked", opener.document.body).val() == 1 ? "<span style='color:red;font-weight:bold;'>" + "CONSTA OCORRÊNCIA" + "</span>" : "NADA CONSTA");
        $("#chkVeiculoBaixadoCirculacao").html($("input[name='BaseBaixado']:checked", opener.document.body).val() == 1 ? "<span style='color:red;font-weight:bold;'>" + "CONSTA OCORRÊNCIA" + "</span>" : "NADA CONSTA");
        $("#chkRestricaoApropriacao").html($("input[name='BaseApropriacao']:checked", opener.document.body).val() == 1 ? "<span style='color:red;font-weight:bold;'>" + "CONSTA OCORRÊNCIA" + "</span>" : "NADA CONSTA");
        //$("#chkRetAcidentes").html($("input[name='BaseAcidentes']:checked", opener.document.body).val() == 1 ? "<span style='color:red;font-weight:bold;'>" + "CONSTA OCORRÊNCIA" + "</span>" : "NADA CONSTA");


     

        $("#chkRetAcidentes").html(
                                            $("input[name='BaseAcidentes']:checked", opener.document.body).val() == 3 ? "NÃO APLICAVEL" :
                                           ($("input[name='BaseAcidentes']:checked", opener.document.body).val() == 1 ? "CONSTA OCORRÊNCIA" :
                                           ($("input[name='BaseAcidentes']:checked", opener.document.body).val() == 0 || $("input[name='BaseAcidentes']:checked", opener.document.body).val() == 2 ? "NADA CONSTA" : "NADA CONSTA"))
                                         );

      

        if ($("input[name='BaseRENAJUD']", opener.document.body).is(":checked")) {
            $("#tbRENAJUDtitle").html("RENAJUD");
            $("#tbRENAJUD").html($("input[name='BaseRENAJUD']:checked", opener.document.body).val());
        }

        //HISTORICO DE CONSULTA
        if (_checkauto.RetHistoricoConsultas == 1) {
           
            var qtd = 0;

            if (_checkauto.XMLHistoricoConsultas) {
                var xmlDocXMLHistoricoConsultas = $.parseXML(_checkauto.XMLHistoricoConsultas.toUpperCase());
                qtd = $(xmlDocXMLHistoricoConsultas).find("REGISTRO").find("DATACONSULTA").length;
            }

            $("#chkHistoricoConsultas").html("Qtd:" + qtd);
        }
        else {
            $("#chkHistoricoConsultas").html("NADA CONSTA");
        }

        $("#chkRestricaoPenhora").html($("input[name='BasePenhora']:checked", opener.document.body).val() == 1 ? "<span style='color:red;font-weight:bold;'>" + "CONSTA OCORRÊNCIA" + "</span>" : "NADA CONSTA");

        //ROUBO E FURTO
        $("#chkRouboFurto").html(_checkauto.RouboFurto);

        var RestricaoHistoricoLeilao;

        if ($("input[name='BaseLeilao']:checked", opener.document.body).val() == 1 || $("input[name='BaseHistoricoLeilao']:checked", opener.document.body).val() == 1)
            RestricaoHistoricoLeilao = "<span style='color:red;'>" + "CONSTA OCORRÊNCIA" + "</span>";
        else
            RestricaoHistoricoLeilao = "NADA CONSTA";


        var RestricaoHistoricoLeilao2;

        if ($("input[name='BaseHistoricoLeilao2']:checked", opener.document.body).val() == 1)
            RestricaoHistoricoLeilao2 = "<span style='color:red;'>" + "CONSTA OCORRÊNCIA" + "</span>";
        else if ($("input[name='BaseHistoricoLeilao2']:checked", opener.document.body).val() == 2)
            RestricaoHistoricoLeilao2 = "NÃO APLICÁVEL";
        else
            RestricaoHistoricoLeilao2 = "NADA CONSTA";

        var RestricaoHistoricoLeilaoRemarketing;

        if ($("input[name='BaseHistoricoLeilaoRemarketing']:checked", opener.document.body).val() == 1)
            RestricaoHistoricoLeilaoRemarketing = "<span style='color:red'>" + "CONSTA OCORRÊNCIA" + "</span>";
        else if ($("input[name='BaseHistoricoLeilaoRemarketing']:checked", opener.document.body).val() == 2)
            RestricaoHistoricoLeilaoRemarketing = "NÃO APLICÁVEL";
        else
            RestricaoHistoricoLeilaoRemarketing = "NADA CONSTA";


        $("#chkRestHistoricodeLeilao").html(RestricaoHistoricoLeilao);

        // TODO: INCLUIR NO CORPO
        $("#chkRestHistoricodeLeilao2").html(RestricaoHistoricoLeilao2);

        $("#chkRestHistoricodeLeilaoRemarketing").html(RestricaoHistoricoLeilaoRemarketing);

        var xmlLeilao = $.parseXML(_checkauto.XMLLeilao);

        if ($(xmlLeilao).find("CodigoRetorno").text() == 1) {
            $("#chkOfertadoLeilao").html($(xmlLeilao).find("Registro").find("DataLeilao").last().text());
        }
        else {
            $("#chkOfertadoLeilao").html("NADA CONSTA");
        }

        var xmlLeilao2 = $.parseXML(_checkauto.XMLLeilao2);

        if ($(xmlLeilao2).find("CodigoRetorno").text() == 1) {
            $("#chkOfertadoLeilao2").html($(xmlLeilao2).find("Registro").find("DataLeilao").last().text());
        }
        else if ($(xmlLeilao2).find("CodigoRetorno").text() == 2) {
            $("#chkOfertadoLeilao2").html("NÃO APLICÁVEL");
        }
        else {
            $("#chkOfertadoLeilao2").html("NADA CONSTA");
        }

        var xmlLeilaoRemarketing = $.parseXML(_checkauto.XMLLeilaoRemarketing);

        if ($(xmlLeilaoRemarketing).find("CodigoRetorno").text() == 1) {

            var registrosRemarketing = $(xmlLeilaoRemarketing).find("Registros").find("Registro").find("TipoInformacao:contains('3')");

            if (registrosRemarketing.length > 0) {
                var dataLeilaoRemarketing = $('DataLeilaoEvento', registrosRemarketing.parent()).parent().last().find("DataLeilaoEvento").text();
                $("#chkOfertadoLeilaoRemarketing").html(dataLeilaoRemarketing);
            }
            else
                $("#chkOfertadoLeilaoRemarketing").html("NADA CONSTA");

            if (xmlLeilao == null) {
                var registrosLeilao = $(xmlLeilaoRemarketing).find("Registros").find("Registro").find("TipoInformacao:contains('1')");

                if (registrosLeilao.length > 0) {
                    var dataLeilao = $('DataLeilaoEvento', registrosLeilao.parent()).parent().last().find("DataLeilaoEvento").text();
                    $("#chkOfertadoLeilao").html(dataLeilao);
                }
                else
                    $("#chkOfertadoLeilao").html("NADA CONSTA");
            }

            if (xmlLeilao2 == null) {
                var registrosLeilao2 = $(xmlLeilaoRemarketing).find("Registros").find("Registro").find("TipoInformacao:contains('2')");

                if (registrosLeilao2.length > 0) {
                    var dataLeilao2 = $('DataLeilaoEvento', registrosLeilao2.parent()).parent().last().find("DataLeilaoEvento").text();
                    $("#chkOfertadoLeilao2").html(dataLeilao2);
                }
                else
                    $("#chkOfertadoLeilao2").html("NADA CONSTA");
            }
        }
        else if ($(xmlLeilaoRemarketing).find("CodigoRetorno").text() == 2) {
            $("#chkOfertadoLeilaoRemarketing").html("NADA CONSTA");
        }
        else {
            $("#chkOfertadoLeilaoRemarketing").html("NÃO APLICÁVEL");
        }

        if (_checkauto.RetRecall == 1) {
            var xmlDocXMLRecall = $.parseXML(_checkauto.XMLRecall.toUpperCase());

            var motivo = $(xmlDocXMLRecall).find("REGISTRO").find("MOTIVO").text();

            var pathImag = window.location.origin;

            if (pathImag.toString().substring(7, 16) != "localhost") {
                $("#tbHistoricoRecall").append("<th align='center' style='width: 50px; border-right: 1px solid #D9D9D9;'>" +
                                               "<img alt='' src='/Images/icone_conforme_nd.png' style='width:27px;height:25px'></th>" +
                                               "<th style='width: 300px;border-right: 0px solid #D9D9D9;text-align: left;margin-top: 0px;float: left;'><b>RECALL</b></th>" +
                                               "<th style='font-size: 11px; float: left;'>Consta – Convocação de Recall</th>");
                //$("#tbHistoricoRecall").append("<tr style='font-weight: bold;'> <td style = 'width:140px;'> HISTÓRICO DE RECALL</td><td style='font-size: 8px; text-align:justify'>" + "Consta – Convocação de Recall" + "</td></tr>");
                $(".dvDecalque2").show();
            }
            else {
                $("#tbHistoricoRecall").append("<th align='center' style='width: 50px; border-right: 1px solid #D9D9D9;'>" +
                                              "<img alt='' src='/Images/icone_conforme_nd.png' style='width:27px;height:25px'></th>" +
                                              "<th style='width: 300px;border-right: 0px solid #D9D9D9;text-align: left;margin-top: 0px;float: left;'><b>RECALL</b></th>" +
                                              "<th style='font-size: 11px;float:left;'>Consta – Convocação de Recall</th>");
                //<img alt='' src='/Images/icone_com_observacao.png')/>
                //$("#tbHistoricoRecall").append("<tr style='font-weight: bold;'><td style = 'width:140px;'>HISTÓRICO DE RECALL</td><td style='font-size: 8px; text-align:justify'>" + "Consta – Convocação de Recall" + "</td></tr>");
                $(".dvDecalque2").show();
            }



        }


        $("#chkRetGarantiaProcedencia").html(_checkauto.RetGarantiaProcedencia == 1 ? "SIM" : "NÃO");
        $("#chkAlienacao").html(_checkauto.Alienacao);
        $("#chkRetGravacao").html(_checkauto.RetGravacao == 1 ? "SIM" : "NÃO");
       // $("#chkReservaDominio").html(_checkauto.ReservaDominio);
        $("#chkReservaDominio").html(_checkauto.ReservaDominio == "" || _checkauto.ReservaDominio == null || _checkauto.ReservaDominio == "NADA CONSTA" ? "NADA CONSTA" : _checkauto.ReservaDominio);

        $("#chkDuplidadeMotor").html($("input[name='BaseDuplicidadeMotor']:checked", opener.document.body).val() == 1 ? "<span style='color:red;font-weight:bold;'>" + "CONSTA OCORRÊNCIA" + "</span>" : "NADA CONSTA");

        if (_renavamcrlv != 3)
            _renavamcoleta = _checkauto.Renavam;

        //REGISTO DO VEICULO
        $("#DadosVeiculo").html(_renavamcoleta + "<br />" + _checkauto.Municipio + "<br />" + _checkauto.TipoVeiculo + "<br />" + _checkauto.NumeroPassageiros + "<br />000<br />" + _checkauto.Potencia);
        $("#DadosVeiculo2").html(_checkauto.Cilindradas + "<br />" + _checkauto.Procedencia + "<br />" + _checkauto.NumeroEixosTraseiros + "<br />" + _checkauto.CMT + "<br />" + _checkauto.PBT + "<br />000");
        $("#DadosVeiculo3").html("<br /><br /><br />");


        //DECODIFICADOR CHASSI
        var infoDeco = $("input[name='InfoDecodificador']:checked", opener.document.body).val();

        if (infoDeco != undefined && infoDeco == 1) {
            $("#tbDecodificador", opener.document.body).find("tr").each(function (i) {
                if (i < 6) {
                    $("#DecoChassi").append("<tr><td>" + $(this).find("td:eq(0)").text() + ":</td><td>" + $(this).find("td:eq(1)").text() + "</td></tr>");
                }
                else if (i < 12) {
                    $("#DecoChassi2").append("<tr><td>" + $(this).find("td:eq(0)").text() + ":</td><td>" + $(this).find("td:eq(1)").text() + "</td></tr>");
                } else if (i < 18) {
                }
            });
            $(".nomeDecodificador").text('DECODIFICADOR CHASSI');
        }
        else {
            $(".ModuloDecodificadorChassi").attr("style", "display:none");
            $(".nomeDecodificador").text('');
        }

        PreencheFotoLeilao(_checkauto);

        PreencheFotoLeilao2(_checkauto);

        PreencheFotoLeilaoRemarketing(_checkauto);
    }

    $("#CapaObservacao").html(_observacao.toUpperCase());
    var qtdepaginas = 0;
    PreencheFotoCapa();


    var _fotoModel = opener.FotoModel;
    var qtdepaginasfotos = Math.ceil(_fotoModel.length / 12);

    // PAGINAÇÃO
    /* Controle adicionado para resolver o problema da paginação quando não houver fotos de leilão*/
    if ($("#divFotosLeilao_").css("display") == 'none')

        $("#divFotosLeilao_").remove();

    if ($("#divFotosLeilao_").css("display") == 'none' && qtdepaginasfotos == 1) {
        var i = 1;
        var j = 1
        var count = $(".dvFooter").size() - 1;

        $(".dvTotalPaginas").html(count);

        $(".dvNoPagina").each(function () {
            if (j != 4) {
                $(this).html(i);
                i++;
            }
            j++;
        });

    }

    /*------------------------------------*/


   

    $(".NomeFilial").each(function () {
        $(this).html($("#ImpFilial option:selected", opener.document.body).text());
    });

    var credenciamentoModel = opener.credenciamentoModel;

    if (credenciamentoModel != null) {

        $(".CNPJFilial").each(function () {
            $(this).html(credenciamentoModel.CNPJ);
        });
        $(".EnderecoFilial").each(function () {
            $(this).html(credenciamentoModel.Endereco + ', ' + credenciamentoModel.Numero);
        });
        $(".BairroFilial").each(function () {
            $(this).html(credenciamentoModel.Bairro + ' - ' + credenciamentoModel.Cidade + ' - CEP ' + credenciamentoModel.CEP + ' - Tel.: ' + credenciamentoModel.DDDFone + ' ' + credenciamentoModel.Fone);
        });
    }


});

function PreencheFotoCapa() {

    var existeAdicionais = false;

    var fotos = $("#FotosAdicionaisImpressao", opener.document.body).val();

    var _fotoModel = opener.FotoModel;
    var qtdepaginas = 1;
    var _produto = $("#Produto", opener.document.body).val();

    if (_produto == "8" || _produto == "6")
        qtdepaginas = Math.ceil((_fotoModel.length - 4) / 12);
    else
        qtdepaginas = Math.ceil(_fotoModel.length / 12);

    $.each(_fotoModel, function (idx, item) {
        switch (item.FotoTipoID) {
            case 38:
                break;
            default:
                if (item.FotoTipoID != 31 && item.FotoTipoID != 32 && item.FotoTipoID != 133) {
                    if (fotos != null) {
                        if ($.inArray(item.FotoTipoID.toString(), fotos) >= 0 || fotos == "0") {
                            totais = totais + 1
                        };
                    }
                }
        }
    });

    if (totais > 11) {
        var decalque = $("dvDecalque").html();
        $(".dvDecalque").remove();
        var htmlfotos = $("#paginafotos").html();
        if (!htmlfotos) {
            htmlfotos = "";
        }
        for (i = 1; i < qtdepaginas; i++) {
            alert("fotos qtdepaginas" + i)
            $("#fotos").append(htmlfotos.replace('id="FotosAdicionais"', 'id="FotosAdicionais' + i + '"'));
        }
        $("#FotosAdicionais" + (qtdepaginas - 1)).append(decalque);
    }

    var fotosadicionais = 0;
    var fotopagina = 0;
    var totais = 0;

    $.each(_fotoModel, function (idx, item) {

        switch (item.Descricao) {
            case "DIANTEIRA C/ LATERAL DIREITA":
                $("#FotoDianteiraLateralDireita").attr("src", item.NomeArquivo);
                if ($('#FotoDianteiraLateralDireita').length)
                    $("#FotoDianteiraLateralDireita").attr("src", item.NomeArquivo);
                break;
            case "DIANTEIRA C/ LATERAL ESQUERDA":
                $("#FotoDianteiraLateralEsquerda").attr("src", item.NomeArquivo);
                if ($('#FotoDianteiraLateralEsquerda').length)
                    $("#FotoDianteiraLateralEsquerda").attr("src", item.NomeArquivo);
                break;
            case "TRASEIRA C/ LATERAL DIREITA":
                $("#FotoTraseiraLateralDireita").attr("src", item.NomeArquivo);
                if ($('#FotoTraseiraLateralDireita').length)
                    $("#FotoTraseiraLateralDireita").attr("src", item.NomeArquivo);
                break;
            case "TRASEIRA C/ LATERAL ESQUERDA":
                $("#FotoTraseiraLateralEsquerda").attr("src", item.NomeArquivo);
                if ($('#FotoTraseiraLateralEsquerda').length)
                    $("#FotoTraseiraLateralEsquerda").attr("src", item.NomeArquivo);
                break;
            default:
                break;
        }


        switch (item.FotoTipoID) {
            case 38:
                $("#FotoCapaChassi").attr("src", item.NomeArquivo);
                break;
            case 37:
                $("#FotoCapMotor").attr("src", item.NomeArquivo);
                break;
            case 33:
                $("#FotoCapDianteira").attr("src", item.NomeArquivo);
                if ($('#FotoCapDianteira2').length)
                    $("#FotoCapDianteira2").attr("src", item.NomeArquivo);
                break;
            case 34:
                $("#FotoCapTraseira").attr("src", item.NomeArquivo);
                if ($('#FotoCapTraseira2').length)
                    $("#FotoCapTraseira2").attr("src", item.NomeArquivo);
                break;
            default:
                if (_produto == "13" && item.FotoTipoID == 131) {
                    $("#FotoCapOleo").attr("src", item.NomeArquivo);
                    break;
                }
                else if (_produto == "13" && item.FotoTipoID == 132) {
                    $("#FotoCapTampaMotor").attr("src", item.NomeArquivo);
                    break;
                }

                if (item.FotoTipoID != 31 && item.FotoTipoID != 32 && item.FotoTipoID != 133) {

                    if (fotos != null) {
                        if ($.inArray(item.FotoTipoID.toString(), fotos) >= 0 || fotos == "0") {

                            if (fotosadicionais == 12) {
                                fotosadicionais = 0;
                                fotopagina++;
                            }

                            if (fotopagina == 0) {
                                $("#FotosAdicionais").append("<li><img alt='' src='" + item.NomeArquivo + "' /><div>" + item.Descricao + "</div></li>");
                            }
                            else {
                                $("#FotosAdicionais" + fotopagina).append("<li><img alt='' src='" + item.NomeArquivo + "' /><div>" + item.Descricao + "</div></li>");
                            }

                            existeAdicionais = true;
                            fotosadicionais++;

                            break;
                        }
                    }
                }
        }
    });

    //if (totais > 12) {
    //   $("#paginafotos .dvIndentFoto #FotosAdicionais li").css({"width":"198px"});
    //}


    if (!existeAdicionais && $("#divFotosAdicionaisMotor") != null) {
        $("#fotos").remove();
    }

}

function PreencheFotoLeilao(_checkauto) {

    var xmlLeilao = $.parseXML(_checkauto.XMLLeilao);
    //var xmlLeilao = _checkauto.XMLLeilao;
    var array = [];
    var arrayregistro = [];
    if ($(xmlLeilao).find("CodigoRetorno").text() == 1) {

        $("#divIdentificacao").prepend($("#tbIdentificacao2").clone());
        $("#divIdentificacao").prepend($("#tbIdentificacao1").clone());

        $.each($(xmlLeilao).find("Registro"), function (i, item) {

            var itemleilao = {
                "Leilao":
                {
                    "Data": $(item).find("DataLeilao").text(),
                    "Leiloeiro": $(item).find("Leiloeiro").text() != "" ? $(item).find("Leiloeiro").text() : "NÃO INFORMADO",
                    "Comitente": $(item).find("Comitente").text() != "" ? $(item).find("Comitente").text() : "NÃO INFORMADO",
                    "Avarias": $(item).find("StatusAvaria").length && $(item).find("StatusAvaria").text() != "" ? $(item).find("StatusAvaria").text() : "NÃO INFORMADO",
                    "Base": '1'
                }
            }

            arrayregistro.push(itemleilao);

            if ($(item).find("Foto1").text() != "")
                array.push($(item).find("Foto1").text());

            if ($(item).find("Foto2").text() != "")
                array.push($(item).find("Foto2").text());

            if ($(item).find("Foto3").text() != "")
                array.push($(item).find("Foto3").text());

            if ($(item).find("Foto4").text() != "")
                array.push($(item).find("Foto4").text());

            if ($(item).find("Foto5").text() != "")
                array.push($(item).find("Foto5").text());

            if ($(item).find("Foto6").text() != "")
                array.push($(item).find("Foto6").text());

            if ($(item).find("Foto7").text() != "")
                array.push($(item).find("Foto7").text());

            if ($(item).find("Foto8").text() != "")
                array.push($(item).find("Foto8").text());
        });

    }

    if (array.length == 0)
        $("#divFotosLeilao_").attr("style", "display:none");
    else {
        var count = 0;
        var div = $("#divFotosLeilao");
        var div_aux = $("#divFotosLeilao").clone();
        for (var i in array) {
            if (count == 12) {
                count = 0;
                div = div_aux.clone().appendTo('#divFotosLeilao_');
            }

            div.find('ul').append("<li><img alt='' src='" + array[i] + "' /><div>FOTO LEILÃO</div></li>");
            count = count + 1;
        }
    }

    if (arrayregistro.length > 0) {
        $("#divRegistrosLeilao").attr("style", "display:block");
        $(".ObservacaoPlus").attr("style", "font-size:9px; height: 40px");

        var div = $("#divRegistrosLeilao");

        var parecerAmarelo = true;

        // exibir até 5 (últimos)
        for (var i = arrayregistro.length > 5 ? arrayregistro.length - 5 : 0 ; i < arrayregistro.length; i++) {

            if (arrayregistro[i].Leilao.Avarias != 'A;SEM DANO')
                parecerAmarelo = false;

            div.find('tbody').append("<tr><td>" + arrayregistro[i].Leilao.Data + "</td><td>" + arrayregistro[i].Leilao.Leiloeiro + "</td><td>" + arrayregistro[i].Leilao.Comitente + "</td>" + "</td><td>" + arrayregistro[i].Leilao.Avarias + "</td><td>" + arrayregistro[i].Leilao.Base + "</td><tr>");
        }

        if (parecerAmarelo)
            $("#imgParecerLeilao").attr("src", "/Images/icone_com_observacao.png");
        else
            $("#imgParecerLeilao").attr("src", "/Images/icone_conforme_nd.png");
    }
}

function PreencheFotoLeilao2(_checkauto) {

    var xmlLeilao = $.parseXML(_checkauto.XMLLeilao2);
    //var xmlLeilao = _checkauto.XMLLeilao;

    var arrayregistro = [];
    if ($(xmlLeilao).find("CodigoRetorno").text() == 1) {

        $("#divIdentificacao").prepend($("#tbIdentificacao2").clone());
        $("#divIdentificacao").prepend($("#tbIdentificacao1").clone());

        $.each($(xmlLeilao).find("Registro"), function (i, item) {

            var itemleilao = {
                "Leilao":
                {
                    "Data": $(item).find("DataLeilao").text(),
                    "Leiloeiro": $(item).find("Leiloeiro").text() != "" ? $(item).find("Leiloeiro").text() : "NÃO INFORMADO",
                    "Comitente": $(item).find("Comitente").text() != "" ? $(item).find("Comitente").text() : "NÃO INFORMADO",
                    "Avarias": "NÃO INFORMADO",
                    "Base": '2'
                }
            }

            arrayregistro.push(itemleilao);
        });

    }

    if (arrayregistro.length > 0) {
        $("#divRegistrosLeilao").attr("style", "display:block");
        $(".ObservacaoPlus").attr("style", "font-size:9px; height: 40px");

        var div = $("#divRegistrosLeilao");

        // exibir até 5 (últimos)
        for (var i = arrayregistro.length > 5 ? arrayregistro.length - 5 : 0 ; i < arrayregistro.length; i++) {
            div.find('tbody').append("<tr><td>" + arrayregistro[i].Leilao.Data + "</td><td>" + arrayregistro[i].Leilao.Leiloeiro + "</td><td>" + arrayregistro[i].Leilao.Comitente + "</td><td>" + arrayregistro[i].Leilao.Avarias + "</td><td>" + arrayregistro[i].Leilao.Base + "</td><tr>");
        }
    }
}

function PreencheFotoLeilaoRemarketing(_checkauto) {

    var xmlLeilao = $.parseXML(_checkauto.XMLLeilaoRemarketing);

    var arrayregistro = [];
    var arrayregistro2 = [];
    var arrayregistroRemarketing = [];
    if ($(xmlLeilao).find("CodigoRetorno").text() == 1) {

        $("#divIdentificacao").prepend($("#tbIdentificacao2").clone());
        $("#divIdentificacao").prepend($("#tbIdentificacao1").clone());

        $.each($(xmlLeilao).find("Registros").find("Registro"), function (i, item) {

            if ($(item).find("TipoInformacao").text() == "1") {

                var itemleilao = {
                    "Leilao":
                    {
                        "Data": $(item).find("DataLeilaoEvento").text(),
                        "Leiloeiro": $(item).find("LeiloeiroVendedor").text() != "" ? $(item).find("LeiloeiroVendedor").text() : "NÃO INFORMADO",
                        "Comitente": $(item).find("ComitenteOrganizador").text() != "" ? $(item).find("ComitenteOrganizador").text() : "NÃO INFORMADO",
                        "Avarias": $(item).find("StatusAvaria").length && $(item).find("StatusAvaria").text() != "" ? $(item).find("StatusAvaria").text() : "NÃO INFORMADO",
                        "Base": '1'
                    }
                }

                arrayregistro.push(itemleilao);
            }
            else if ($(item).find("TipoInformacao").text() == "2") {

                var itemleilao = {
                    "Leilao":
                    {
                        "Data": $(item).find("DataLeilaoEvento").text(),
                        "Leiloeiro": $(item).find("LeiloeiroVendedor").text() != "" ? $(item).find("LeiloeiroVendedor").text() : "NÃO INFORMADO",
                        "Comitente": $(item).find("ComitenteOrganizador").text() != "" ? $(item).find("ComitenteOrganizador").text() : "NÃO INFORMADO",
                        "Avarias": "NÃO INFORMADO",
                        "Base": '2'
                    }
                }

                arrayregistro2.push(itemleilao);
            }
            else if ($(item).find("TipoInformacao").text() == "3") {

                var itemleilao = {
                    "Leilao":
                    {
                        "Data": $(item).find("DataLeilaoEvento").text(),
                        "Leiloeiro": $(item).find("LeiloeiroVendedor").text() != "" ? $(item).find("LeiloeiroVendedor").text() : "NÃO INFORMADO",
                        "Comitente": $(item).find("ComitenteOrganizador").text() != "" ? $(item).find("ComitenteOrganizador").text() : "NÃO INFORMADO",
                        "Avarias": "NÃO INFORMADO",
                        "Base": 'Remarketing'
                    }
                }

                arrayregistroRemarketing.push(itemleilao);
            }

        });

    }

    if (arrayregistro.length > 0 || arrayregistro2.length > 0 || arrayregistroRemarketing.length > 0) {
        $("#divRegistrosLeilao").attr("style", "display:block");
        $(".ObservacaoPlus").attr("style", "font-size:9px; height: 40px");

        var div = $("#divRegistrosLeilao");

        var parecerAmarelo = true;

        // exibir até 5 (últimos)
        for (var i = arrayregistro.length > 5 ? arrayregistro.length - 5 : 0 ; i < arrayregistro.length; i++) {

            if (arrayregistro[i].Leilao.Avarias != 'A;SEM DANO')
                parecerAmarelo = false;

            div.find('tbody').append("<tr><td>" + arrayregistro[i].Leilao.Data + "</td><td>" + arrayregistro[i].Leilao.Leiloeiro + "</td><td>" + arrayregistro[i].Leilao.Comitente + "</td><td>" + arrayregistro[i].Leilao.Avarias + "</td><td>" + arrayregistro[i].Leilao.Base + "</td><tr>");
        }

        // exibir até 5 (últimos)
        for (var i = arrayregistro2.length > 5 ? arrayregistro2.length - 5 : 0 ; i < arrayregistro2.length; i++) {

            parecerAmarelo = false;

            div.find('tbody').append("<tr><td>" + arrayregistro2[i].Leilao.Data + "</td><td>" + arrayregistro2[i].Leilao.Leiloeiro + "</td><td>" + arrayregistro2[i].Leilao.Comitente + "</td><td>" + arrayregistro2[i].Leilao.Avarias + "</td><td>" + arrayregistro2[i].Leilao.Base + "</td><tr>");
        }

        // exibir até 5 (últimos)
        for (var i = arrayregistroRemarketing.length > 5 ? arrayregistroRemarketing.length - 5 : 0 ; i < arrayregistroRemarketing.length; i++) {

            parecerAmarelo = false;

            div.find('tbody').append("<tr><td>" + arrayregistroRemarketing[i].Leilao.Data + "</td><td>" + arrayregistroRemarketing[i].Leilao.Leiloeiro + "</td><td>" + arrayregistroRemarketing[i].Leilao.Comitente + "</td><td>" + arrayregistroRemarketing[i].Leilao.Avarias + "</td><td>" + arrayregistroRemarketing[i].Leilao.Base + "</td><tr>");
        }

        if (parecerAmarelo)
            $("#imgParecerLeilao").attr("src", "/SmartMobile/BackOfficeAnalise/Images/icone_com_observacao.png");
        else
            $("#imgParecerLeilao").attr("src", "/SmartMobile/BackOfficeAnalise/Images/icone_reprovado.png");
    }
}

