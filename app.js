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

  // Parsear números
  let nums = numsInput
    .split(",")
    .map(x => parseInt(x.trim()))
    .filter(x => !isNaN(x) && x > 0);

  if (nums.length === 0) {
    mostrarError("No se encontraron pesos válidos", resDiv);
    return;
  }

  // Ordena de mayor a menor (optimización)
  nums.sort((a, b) => b - a);

  let best = null;
  let bestDiff = Infinity;
  let iteraciones = 0;
  const maxIteraciones = 100000;

  function dfs(i, path, sum) {
    iteraciones++;
    if (iteraciones > maxIteraciones) return;

    // Verifica si está dentro del rango de items
    if (path.length >= minItems && path.length <= maxItems) {
      let diff = Math.abs(target - sum);
      if (diff < bestDiff) {
        bestDiff = diff;
        best = path.slice();
      }
      if (diff === 0) return; // Solución perfecta encontrada
    }

    if (path.length >= maxItems) return;

    for (let j = i; j < nums.length; j++) {
      path.push(nums[j]);
      dfs(j + 1, path, sum + nums[j]);
      path.pop();
    }
  }

  dfs(0, [], 0);

  if (best) {
    let total = best.reduce((a, b) => a + b, 0);
    let diferencia = target - total;
    const porcentaje = ((Math.abs(diferencia) / target) * 100).toFixed(2);

    ultimoResultado = {
      items: best,
      total: total,
      diferencia: diferencia,
      target: target,
      cantidad: best.length
    };

    let resultado = `✅ RESULTADO ENCONTRADO\n`;
    resultado += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    resultado += `Items seleccionados (${best.length}):\n`;
    resultado += best.map(x => `  • ${x.toLocaleString()} kg`).join("\n");
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
  document.getElementById("nums").value = "3010,2478,2540,2876,2779,1804,2686,1446,2386,2714,2466,2878,3028";
  document.getElementById("target").value = "25000";
  document.getElementById("minItems").value = "8";
  document.getElementById("maxItems").value = "14";
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
  csv += "Items Seleccionados\n";

  ultimoResultado.items.forEach((item, index) => {
    csv += (index + 1) + "," + item + "\n";
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