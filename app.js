let ultimoResultado = null;

function solve() {
  const numsInput = document.getElementById("nums").value;
  const target = parseInt(document.getElementById("target").value);
  const minItems = parseInt(document.getElementById("minItems").value) || 8;
  const maxItems = parseInt(document.getElementById("maxItems").value) || 14;
  const resDiv = document.getElementById("res");

  // Validar entrada
  if (!numsInput.trim()) {
    mostrarError("Por favor ingresa los pesos", resDiv);
    return;
  }

  if (isNaN(target) || target <= 0) {
    mostrarError("Por favor ingresa un peso objetivo válido", resDiv);
    return;
  }

  if (minItems > maxItems) {
    mostrarError("El mínimo no puede ser mayor que el máximo", resDiv);
    return;
  }

  // Parsear números con índice original
  let numsConIndice = numsInput
    .split(",")
    .map((x, index) => ({ valor: parseInt(x.trim()), indice: index + 1 }))
    .filter(x => !isNaN(x.valor) && x.valor > 0);

  if (numsConIndice.length === 0) {
    mostrarError("No se encontraron pesos válidos", resDiv);
    return;
  }

  // Obtener solo los valores para ordenar
  let nums = numsConIndice.map(x => x.valor);
  let numsOrdenados = [...numsConIndice];
  
  // Ordena de mayor a menor (optimización)
  numsOrdenados.sort((a, b) => b.valor - a.valor);
  nums.sort((a, b) => b - a);

  let best = null;
  let bestIndices = null;
  let bestDiff = Infinity;
  let iteraciones = 0;
  const maxIteraciones = 100000;

  function dfs(i, path, pathIndices, sum) {
    iteraciones++;
    if (iteraciones > maxIteraciones) return;

    // Verifica si está dentro del rango de items
    if (path.length >= minItems && path.length <= maxItems) {
      let diff = Math.abs(target - sum);
      if (diff < bestDiff) {
        bestDiff = diff;
        best = path.slice();
        bestIndices = pathIndices.slice();
      }
      if (diff === 0) return; // Solución perfecta encontrada
    }

    if (path.length >= maxItems) return;

    for (let j = i; j < numsOrdenados.length; j++) {
      path.push(numsOrdenados[j].valor);
      pathIndices.push(numsOrdenados[j].indice);
      dfs(j + 1, path, pathIndices, sum + numsOrdenados[j].valor);
      path.pop();
      pathIndices.pop();
    }
  }

  dfs(0, [], [], 0);

  if (best) {
    let total = best.reduce((a, b) => a + b, 0);
    let diferencia = target - total;
    const porcentaje = ((Math.abs(diferencia) / target) * 100).toFixed(2);

    // Crear arreglo con paquete y peso
    let paquetes = best.map((peso, idx) => ({
      numero: bestIndices[idx],
      peso: peso
    }));
    
    // Ordenar por número de paquete
    paquetes.sort((a, b) => a.numero - b.numero);

    ultimoResultado = {
      items: best,
      paquetes: paquetes,
      total: total,
      diferencia: diferencia,
      target: target,
      cantidad: best.length
    };

    let resultado = `✅ RESULTADO ENCONTRADO\n`;
    resultado += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    resultado += `Items seleccionados (${best.length}):\n`;
    resultado += paquetes.map(p => `  • Paquete #${p.numero}: ${p.peso.toLocaleString()} kg`).join("\n");
    resultado += `\n\nTotal: ${total.toLocaleString()} kg\n`;
    resultado += `Objetivo: ${target.toLocaleString()} kg\n`;
    resultado += `Diferencia: ${diferencia > 0 ? '+' : ''}${diferencia.toLocaleString()} kg\n`;
    resultado += `Precisión: ${(100 - parseFloat(porcentaje)).toFixed(2)}%\n`;
    resultado += `━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    resDiv.innerHTML = resultado;
    resDiv.className = 'result show success';
    document.getElementById("btnExportar").style.display = 'block';
  } else {
    mostrarError("No se encontró una combinación válida", resDiv);
  }
}

function mostrarError(mensaje, resDiv) {
  resDiv.innerHTML = `❌ ERROR\n\n${mensaje}`;
  resDiv.className = 'result show error';
  document.getElementById("btnExportar").style.display = 'none';
  ultimoResultado = null;
}

function limpiar() {
  document.getElementById("nums").value = "";
  document.getElementById("target").value = "";
  document.getElementById("minItems").value = "1";
  document.getElementById("maxItems").value = "20";
  document.getElementById("res").innerHTML = "";
  document.getElementById("res").className = "result";
  document.getElementById("btnExportar").style.display = 'none';
  ultimoResultado = null;
}

function exportarCSV() {
  if (!ultimoResultado) return;

  let csv = "Carga Perfecta - Resultado\n";
  csv += "Fecha," + new Date().toLocaleString() + "\n";
  csv += "Objetivo," + ultimoResultado.target + "\n";
  csv += "Total," + ultimoResultado.total + "\n";
  csv += "Diferencia," + ultimoResultado.diferencia + "\n";
  csv += "Cantidad de Items," + ultimoResultado.cantidad + "\n\n";
  csv += "Paquete,Peso\n";

  ultimoResultado.paquetes.forEach((paquete) => {
    csv += "Paquete #" + paquete.numero + "," + paquete.peso + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", `carga-perfecta-${Date.now()}.csv`);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Permitir Enter para calcular
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("target").addEventListener('keypress', function(e) {
    if (e.key === 'Enter') solve();
  });

  document.getElementById("nums").addEventListener('keypress', function(e) {
    if (e.ctrlKey && e.key === 'Enter') solve();
  });
});
